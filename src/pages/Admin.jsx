import React, { useState, useEffect } from 'react';
import { base44 as base44Client } from '@/api/base44Client';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Trash2, Plus, Save, Lock } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState('schedule');
  
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const data = await base44.entities.Event.list('order');
      return data;
    },
    enabled: isAuthenticated,
  });

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data[0];
    },
    enabled: isAuthenticated,
  });

  const [headerForm, setHeaderForm] = useState({
    banner_enabled: true,
    banner_text: '',
    banner_location: '',
    countdown_date: ''
  });

  useEffect(() => {
    if (settings) {
      setHeaderForm(settings);
    }
  }, [settings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (data) => {
      if (settings?.id) {
        return await base44.entities.SiteSettings.update(settings.id, data);
      } else {
        return await base44.entities.SiteSettings.create(data);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['siteSettings'] }),
  });

  const createMutation = useMutation({
    mutationFn: (newEvent) => base44.entities.Event.create(newEvent),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Event.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Event.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await base44Client.functions.invoke('verifyAdminPasscode', { passcode });
      if (res.data?.success) {
        setIsAuthenticated(true);
      } else {
        alert('Incorrect passcode');
      }
    } catch (err) {
      alert('Incorrect passcode');
    }
  };

  const handleAddNew = () => {
    const maxOrder = events.length > 0 ? Math.max(...events.map(e => e.order)) : 0;
    createMutation.mutate(
      {
        type: 'rehearsal',
        title: 'New Event',
        date: new Date().toISOString().split('T')[0],
        time: '',
        location: '',
        order: maxOrder + 1,
        is_tbd: false,
      },
      {
        onError: (error) => {
          console.error('Create error:', error);
          alert('Failed to create event. Please try again.');
        }
      }
    );
  };

  const handleSave = (id) => {
    const dataToSave = {
      type: editForm.type,
      title: editForm.title,
      date: editForm.date,
      time: editForm.time,
      location: editForm.location,
      order: editForm.order,
      is_tbd: editForm.is_tbd,
    };
    
    updateMutation.mutate(
      { id, data: dataToSave },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditForm({});
        },
        onError: (error) => {
          console.error('Save error:', error);
          alert('Failed to save event. Please try again.');
        }
      }
    );
  };

  const handleDelete = (id) => {
    if (confirm('Delete this event?')) {
      deleteMutation.mutate(id, {
        onError: (error) => {
          console.error('Delete error:', error);
          alert('Failed to delete event. Please try again.');
        }
      });
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(events);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order for all items
    for (let i = 0; i < items.length; i++) {
      if (items[i].order !== i) {
        await base44.entities.Event.update(items[i].id, { order: i });
      }
    }
    queryClient.invalidateQueries({ queryKey: ['events'] });
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setEditForm(event);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="bg-[#1c1c1c] border border-[#333] rounded-2xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-[#2e8b57]" />
          </div>
          <h1 className="text-2xl font-serif text-[#ededed] text-center mb-2">
            DYSO Admin Panel
          </h1>
          <p className="text-[#a1a1a1] text-center mb-6 text-sm">
            Enter passcode to manage site
          </p>
          <form onSubmit={handleLogin}>
            <Input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="mb-4 bg-[#0a0a0a] border-[#333] text-[#ededed]"
            />
            <Button type="submit" className="w-full bg-[#2e8b57] hover:bg-[#267347]">
              Unlock
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const handleSaveHeader = () => {
    const dataToSave = {
      banner_enabled: headerForm.banner_enabled,
      banner_text: headerForm.banner_text,
      banner_location: headerForm.banner_location,
      countdown_date: headerForm.countdown_date,
      applications_open: headerForm.applications_open,
      application_deadline: headerForm.application_deadline,
      audition_date: headerForm.audition_date,
      audition_date_display: headerForm.audition_date_display,
      audition_time: headerForm.audition_time,
      audition_location: headerForm.audition_location,
      orchestra_application_link: headerForm.orchestra_application_link,
      ra_application_link: headerForm.ra_application_link,
      remind_code: headerForm.remind_code,
      contact_email: headerForm.contact_email,
      orchestra_eligibility: headerForm.orchestra_eligibility,
      orchestra_requirements: headerForm.orchestra_requirements,
      ra_responsibilities: headerForm.ra_responsibilities,
    };
    
    updateSettingsMutation.mutate(dataToSave, {
      onSuccess: () => {
        alert('Settings saved successfully!');
      },
      onError: (error) => {
        console.error('Save error:', error);
        alert('Failed to save settings. Please try again.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-[#ededed] mb-8">DYSO Admin Panel</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#333]">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'schedule'
                ? 'text-[#2e8b57] border-b-2 border-[#2e8b57]'
                : 'text-[#a1a1a1] hover:text-[#ededed]'
            }`}
          >
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'applications'
                ? 'text-[#2e8b57] border-b-2 border-[#2e8b57]'
                : 'text-[#a1a1a1] hover:text-[#ededed]'
            }`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'text-[#2e8b57] border-b-2 border-[#2e8b57]'
                : 'text-[#a1a1a1] hover:text-[#ededed]'
            }`}
          >
            Settings
          </button>
        </div>

        {activeTab === 'schedule' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-[#a1a1a1]">Drag to reorder • Click to edit • Changes save automatically</p>
              <Button onClick={handleAddNew} className="bg-[#2e8b57] hover:bg-[#267347]">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center text-[#a1a1a1] py-12">Loading...</div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="events">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      {events.map((event, index) => (
                        <Draggable key={event.id} draggableId={event.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-[#1c1c1c] border border-[#333] rounded-xl p-4 ${
                                snapshot.isDragging ? 'shadow-xl shadow-[#2e8b57]/20' : ''
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                {/* Drag Handle */}
                                <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                  <GripVertical className="w-5 h-5 text-[#666]" />
                                </div>

                                {/* Type */}
                                <div className="w-32">
                                  {editingId === event.id ? (
                                    <Select
                                      value={editForm.type}
                                      onValueChange={(val) => setEditForm({ ...editForm, type: val })}
                                    >
                                      <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-[#ededed]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="rehearsal">Rehearsal</SelectItem>
                                        <SelectItem value="concert">Concert</SelectItem>
                                        <SelectItem value="break">Break</SelectItem>
                                        <SelectItem value="trip">Trip</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <span className="text-[#a1a1a1] capitalize">{event.type}</span>
                                  )}
                                </div>

                                {/* Title */}
                                <div className="flex-1">
                                  {editingId === event.id ? (
                                    <Input
                                      value={editForm.title}
                                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                      className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                                    />
                                  ) : (
                                    <span className="text-[#ededed]">{event.title}</span>
                                  )}
                                </div>

                                {/* Date */}
                                <div className="w-36">
                                  {editingId === event.id ? (
                                    <div className="space-y-1">
                                      <Input
                                        type="date"
                                        value={editForm.date}
                                        disabled={editForm.is_tbd}
                                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                        className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                                      />
                                      <label className="flex items-center gap-1.5 text-xs text-[#a1a1a1]">
                                        <input
                                          type="checkbox"
                                          checked={editForm.is_tbd || false}
                                          onChange={(e) => setEditForm({ ...editForm, is_tbd: e.target.checked })}
                                          className="w-3.5 h-3.5"
                                        />
                                        TBD
                                      </label>
                                    </div>
                                  ) : (
                                    <span className="text-[#a1a1a1]">{event.is_tbd ? 'TBD' : event.date}</span>
                                  )}
                                </div>

                                {/* Time */}
                                <div className="w-24">
                                  {editingId === event.id ? (
                                    <Input
                                      value={editForm.time || ''}
                                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                      placeholder="Time"
                                      className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                                    />
                                  ) : (
                                    <span className="text-[#a1a1a1]">{event.time || '-'}</span>
                                  )}
                                </div>

                                {/* Location */}
                                <div className="w-48">
                                  {editingId === event.id ? (
                                    <Input
                                      value={editForm.location || ''}
                                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                      placeholder="Location"
                                      className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                                    />
                                  ) : (
                                    <span className="text-[#a1a1a1]">{event.location || '-'}</span>
                                  )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                  {editingId === event.id ? (
                                    <>
                                      <Button
                                        onClick={() => handleSave(event.id)}
                                        size="sm"
                                        className="bg-[#2e8b57] hover:bg-[#267347]"
                                        disabled={updateMutation.isPending}
                                      >
                                        <Save className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          setEditingId(null);
                                          setEditForm({});
                                        }}
                                        size="sm"
                                        variant="outline"
                                        className="border-[#333] text-[#a1a1a1] hover:bg-[#333]/20"
                                      >
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <Button
                                      onClick={() => startEdit(event)}
                                      size="sm"
                                      variant="outline"
                                      className="border-[#333] bg-[#0a0a0a] text-[#ededed] hover:bg-[#2e8b57]/10"
                                    >
                                      Edit
                                    </Button>
                                  )}
                                  <Button
                                    onClick={() => handleDelete(event.id)}
                                    size="sm"
                                    variant="outline"
                                    className="border-red-900/30 text-red-400 hover:bg-red-900/20"
                                    disabled={deleteMutation.isPending}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="bg-[#1c1c1c] border border-[#333] rounded-xl p-8">
              <h2 className="text-2xl font-serif text-[#ededed] mb-6">Application Settings</h2>
              
              <div className="space-y-6">

                {/* Audition Details */}
                <div className="bg-[#0a0a0a] border border-[#2e8b57]/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-[#2e8b57] font-semibold text-sm uppercase tracking-widest">Audition Details (shown on Audition page)</h3>
                  <div>
                    <label className="text-[#a1a1a1] text-sm mb-2 block">Audition Date</label>
                    <Input
                      value={headerForm.audition_date_display || ''}
                      onChange={(e) => setHeaderForm({ ...headerForm, audition_date_display: e.target.value })}
                      placeholder="Wednesday, May 27"
                      className="bg-[#1c1c1c] border-[#333] text-[#ededed]"
                    />
                  </div>
                  <div>
                    <label className="text-[#a1a1a1] text-sm mb-2 block">Audition Time</label>
                    <Input
                      value={headerForm.audition_time || ''}
                      onChange={(e) => setHeaderForm({ ...headerForm, audition_time: e.target.value })}
                      placeholder="4PM–6PM"
                      className="bg-[#1c1c1c] border-[#333] text-[#ededed]"
                    />
                  </div>
                  <div>
                    <label className="text-[#a1a1a1] text-sm mb-2 block">Audition Location</label>
                    <Input
                      value={headerForm.audition_location || ''}
                      onChange={(e) => setHeaderForm({ ...headerForm, audition_location: e.target.value })}
                      placeholder="Karrer Middle School Music Wing"
                      className="bg-[#1c1c1c] border-[#333] text-[#ededed]"
                    />
                  </div>
                </div>

                {/* Applications Open/Closed */}
                <div>
                  <label className="text-[#ededed] font-medium mb-3 block">Application Status</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={headerForm.applications_open || false}
                      onChange={(e) => setHeaderForm({ ...headerForm, applications_open: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <label className="text-[#a1a1a1]">Applications are currently open</label>
                  </div>
                </div>

                {/* Applications Open Date */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Applications Open (displayed when closed)</label>
                  <Input
                    value={headerForm.application_deadline || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, application_deadline: e.target.value })}
                    placeholder="Fall 2026"
                    className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                  />
                  <p className="text-[#666] text-xs mt-1">Example: "Fall 2026" or "August 2026"</p>
                </div>

                {/* Applications Close Date */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Application Deadline (displayed when open)</label>
                  <Input
                    value={headerForm.audition_date || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, audition_date: e.target.value })}
                    placeholder="May 15, 2026"
                    className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                  />
                  <p className="text-[#666] text-xs mt-1">Example: "May 15, 2026" - shown when applications are open</p>
                </div>

                {/* Orchestra Application Link */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Orchestra Application Form URL</label>
                  <Input
                    value={headerForm.orchestra_application_link || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, orchestra_application_link: e.target.value })}
                    placeholder="https://forms.google.com/..."
                    className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                  />
                </div>

                {/* RA Application Link */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Rehearsal Assistant Application Form URL</label>
                  <Input
                    value={headerForm.ra_application_link || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, ra_application_link: e.target.value })}
                    placeholder="https://forms.google.com/..."
                    className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                  />
                </div>

                <Button 
                  onClick={handleSaveHeader} 
                  className="bg-[#2e8b57] hover:bg-[#267347]"
                  disabled={updateSettingsMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateSettingsMutation.isPending ? 'Saving...' : 'Save Application Settings'}
                </Button>
              </div>
            </div>

            {/* Audition Requirements Section */}
            <div className="bg-[#1c1c1c] border border-[#333] rounded-xl p-8">
              <h2 className="text-2xl font-serif text-[#ededed] mb-6">Audition Requirements</h2>
              
              <div className="space-y-6">
                {/* Orchestra Eligibility */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Orchestra Eligibility (one per line)</label>
                  <textarea
                    value={headerForm.orchestra_eligibility || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, orchestra_eligibility: e.target.value })}
                    rows={5}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#ededed] rounded-lg p-3 text-sm font-mono"
                    placeholder="• String players (violin, viola, cello, bass)&#10;• Ages 12-18"
                  />
                </div>

                {/* Orchestra Requirements */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Orchestra Audition Requirements (one per line)</label>
                  <textarea
                    value={headerForm.orchestra_requirements || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, orchestra_requirements: e.target.value })}
                    rows={5}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#ededed] rounded-lg p-3 text-sm font-mono"
                    placeholder="• Prepare one solo piece (2-3 minutes)&#10;• Sight-reading assessment"
                  />
                </div>

                {/* RA Responsibilities */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Rehearsal Assistant Responsibilities (one per line)</label>
                  <textarea
                    value={headerForm.ra_responsibilities || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, ra_responsibilities: e.target.value })}
                    rows={5}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#ededed] rounded-lg p-3 text-sm font-mono"
                    placeholder="• Assist conductors during rehearsals&#10;• Help with music distribution"
                  />
                </div>

                <Button 
                  onClick={handleSaveHeader} 
                  className="bg-[#2e8b57] hover:bg-[#267347]"
                  disabled={updateSettingsMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateSettingsMutation.isPending ? 'Saving...' : 'Save Requirements'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-[#1c1c1c] border border-[#333] rounded-xl p-8">
              <h2 className="text-2xl font-serif text-[#ededed] mb-6">Contact & Communication</h2>
              
              <div className="space-y-6">
                {/* Remind Code */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Remind Code (updates yearly)</label>
                  <Input
                    value={headerForm.remind_code || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, remind_code: e.target.value })}
                    placeholder="@25DYSO"
                    className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label className="text-[#a1a1a1] text-sm mb-2 block">Contact Email</label>
                  <Input
                    value={headerForm.contact_email || ''}
                    onChange={(e) => setHeaderForm({ ...headerForm, contact_email: e.target.value })}
                    placeholder="info@dyso.org"
                    className="bg-[#0a0a0a] border-[#333] text-[#ededed]"
                  />
                </div>

                <Button 
                  onClick={handleSaveHeader} 
                  className="bg-[#2e8b57] hover:bg-[#267347]"
                  disabled={updateSettingsMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {updateSettingsMutation.isPending ? 'Saving...' : 'Save Contact Settings'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}