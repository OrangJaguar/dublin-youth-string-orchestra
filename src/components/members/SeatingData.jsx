// Seating chart data - Dark Mode "Vector Stage Map"
// Uniform grey seats - the people are the focus, not the chairs

export const sectionColors = {
  "Violin I":  { bg: "#E0F2F1", border: "#80CBC4" }, // Very Light Teal
  "Violin II": { bg: "#C8E6C9", border: "#81C784" }, // Light Green
  "Viola":     { bg: "#A5D6A7", border: "#66BB6A" }, // Medium Green
  "Cello":     { bg: "#81C784", border: "#4CAF50" }, // Deep Green
  "Bass":      { bg: "#66BB6A", border: "#2E7D32" }, // Darkest Green
};

// Simplified label colors for the legend
export const sectionLabelColors = {
  "Violin I":  "#E0F2F1",
  "Violin II": "#C8E6C9",
  "Viola":     "#A5D6A7",
  "Cello":     "#81C784",
  "Bass":      "#66BB6A",
};

// Seats arranged to match the exact layout from the image
export const seats = [
  // Top Row - Left side (Violin I)
  { id: 1, name: "Violin I", section: "Violin I", isRA: false, x: 18, y: 22 },
  { id: 2, name: "Violin I", section: "Violin I", isRA: false, x: 25, y: 20 },
  { id: 3, name: "Violin I", section: "Violin I", isRA: false, x: 20, y: 28 },
  { id: 4, name: "Violin I", section: "Violin I", isRA: false, x: 27, y: 26 },
  
  // Top Row - Left Center (Violin I)
  { id: 5, name: "Violin I", section: "Violin I", isRA: false, x: 33, y: 24 },
  { id: 6, name: "Violin I", section: "Violin I", isRA: false, x: 15, y: 36 },
  { id: 7, name: "Violin I", section: "Violin I", isRA: false, x: 22, y: 34 },
  { id: 8, name: "Violin I", section: "Violin I", isRA: false, x: 28, y: 32 },
  
  // Middle Left (Violin I)
  { id: 9, name: "Violin I", section: "Violin I", isRA: false, x: 17, y: 44 },
  { id: 10, name: "Violin I", section: "Violin I", isRA: false, x: 24, y: 42 },
  
  // Top Row - Center/Right (Violin II) 
  { id: 11, name: "Violin II", section: "Violin II", isRA: true, x: 39, y: 22 },
  { id: 12, name: "Violin II", section: "Violin II", isRA: true, x: 46, y: 26 },
  { id: 13, name: "Violin II", section: "Violin II", isRA: false, x: 53, y: 30 },
  { id: 14, name: "Violin II", section: "Violin II", isRA: false, x: 60, y: 27 },
  
  // Right side top (Violin II)
  { id: 15, name: "Violin II", section: "Violin II", isRA: false, x: 67, y: 22 },
  { id: 16, name: "Violin II", section: "Violin II", isRA: false, x: 74, y: 20 },
  { id: 17, name: "Violin II", section: "Violin II", isRA: false, x: 82, y: 22 },
  
  // Right side middle (Violin II)
  { id: 18, name: "Violin II", section: "Violin II", isRA: false, x: 71, y: 28 },
  { id: 19, name: "Violin II", section: "Violin II", isRA: false, x: 78, y: 30 },
  { id: 20, name: "Violin II", section: "Violin II", isRA: false, x: 85, y: 32 },
  
  // Right side lower (Violin II)
  { id: 21, name: "Violin II", section: "Violin II", isRA: false, x: 74, y: 36 },
  { id: 22, name: "Violin II", section: "Violin II", isRA: false, x: 81, y: 40 },
  
  // Middle section (Viola)
  { id: 23, name: "Viola", section: "Viola", isRA: true, x: 35, y: 32 },
  { id: 24, name: "Viola", section: "Viola", isRA: false, x: 42, y: 34 },
  { id: 25, name: "Viola", section: "Viola", isRA: false, x: 48, y: 38 },
  { id: 26, name: "Viola", section: "Viola", isRA: false, x: 55, y: 40 },
  { id: 27, name: "Viola", section: "Viola", isRA: false, x: 62, y: 36 },
  
  // Viola lower
  { id: 28, name: "Viola", section: "Viola", isRA: false, x: 31, y: 40 },
  { id: 29, name: "Viola", section: "Viola", isRA: false, x: 38, y: 42 },
  { id: 30, name: "Viola", section: "Viola", isRA: false, x: 44, y: 46 },
  { id: 31, name: "Viola", section: "Viola", isRA: false, x: 51, y: 48 },
  { id: 32, name: "Viola", section: "Viola", isRA: false, x: 58, y: 46 },
  { id: 33, name: "Viola", section: "Viola", isRA: false, x: 65, y: 44 },
  
  // Cello section
  { id: 34, name: "Cello", section: "Cello", isRA: true, x: 35, y: 50 },
  { id: 35, name: "Cello", section: "Cello", isRA: false, x: 42, y: 54 },
  { id: 36, name: "Cello", section: "Cello", isRA: false, x: 49, y: 56 },
  { id: 37, name: "Cello", section: "Cello", isRA: false, x: 56, y: 56 },
  { id: 38, name: "Cello", section: "Cello", isRA: false, x: 63, y: 54 },
  { id: 39, name: "Cello", section: "Cello", isRA: false, x: 70, y: 52 },
  
  // Cello lower
  { id: 40, name: "Cello", section: "Cello", isRA: false, x: 39, y: 62 },
  { id: 41, name: "Cello", section: "Cello", isRA: false, x: 46, y: 64 },
  { id: 42, name: "Cello", section: "Cello", isRA: false, x: 54, y: 64 },
  { id: 43, name: "Cello", section: "Cello", isRA: false, x: 61, y: 62 },
  
  // Bass section
  { id: 44, name: "Bass", section: "Bass", isRA: false, x: 76, y: 44 },
  { id: 45, name: "Bass", section: "Bass", isRA: false, x: 33, y: 70 },
  { id: 46, name: "Bass", section: "Bass", isRA: false, x: 41, y: 74 },
  { id: 47, name: "Bass", section: "Bass", isRA: false, x: 49, y: 76 },
  { id: 48, name: "Bass", section: "Bass", isRA: false, x: 57, y: 74 },
  { id: 49, name: "Bass", section: "Bass", isRA: false, x: 65, y: 70 },
];

export const conductors = [
  {
    id: 1,
    name: "Mr. Matthew Hawley",
    school: "Karrer Middle School, 1999-Present",
    degrees: [
      "MA Educational Administration - The Ohio State University",
      "Bachelor of Music Education & Cello Performance - The Ohio State University"
    ],
    bio: `Matthew Hawley is in his 27th year as Director of Orchestras at Dr. Henry Karrer Middle School in Dublin, Ohio. Mr. Hawley is a graduate of The Ohio State University, holding Bachelor's Degrees in Cello Performance and Instrumental Education, as well as a Master's Degree in Educational Administration. He founded the Dublin Youth String Orchestra in 1999 and was the director from 1999-2025. Mr. Hawley's ensembles have appeared at the OMEA Conference on four occasions, and have also performed at the ASTA National Orchestra Festival.

Mr. Hawley has received The Golden Shamrock Award, a lifetime achievement award presented by the Dublin City Schools. He has also received the Ohio School Boards Association Outstanding Teacher Award and the Dublin Community Champion Award. In addition, he has been nominated on multiple occasions for the Columbus Symphony Orchestra Music Educator Award, and in 2010 was nominated for the Ohio Teacher of the Year Award. As a cellist, Mr. Hawley maintains a small studio of private students, and is Principal Cellist with the Central Ohio Symphony.

Mr. Hawley enjoys being outdoors, watching the Buckeyes, and spending time with his wife Amy and their two daughters Hayden (19) and Hanna (16).`,
    image: "https://www.dublinyouthstringorchestra.com/uploads/1/2/8/6/12866982/editor/hawley.jpg?1616688124"
  },
  {
    id: 2,
    name: "Ms. Kathryn Liddle",
    school: "Grizzell Middle School, 2006-Present",
    degrees: [
      "MA String Pedagogy - The Ohio State University",
      "BM Music Education & Violin Performance - Miami University"
    ],
    bio: `Ms. Liddle is in her 21st year as an educator - she enjoys collaborating with the other Dublin Middle School Strings Teachers and working with talented students from across the district in the DYSO program. In addition to teaching, Ms. Liddle is proud to serve on the Executive Board of the Dublin Educators' Association and the Board of Directors for Capriccio Columbus and the Dublin Community Bands organization. Musically, Ms. Liddle is a member of the Dublin Cornet Band, Dublin Wind Symphony, Capriccio Columbus Choir, performs in the Central Ohio Symphony on violin and viola, and plays violin in a Celtic Combo band for fun.`,
    image: "https://www.dublinyouthstringorchestra.com/uploads/1/2/8/6/12866982/editor/dyso-06.jpg?1616688133"
  },
  {
    id: 3,
    name: "Mr. Mike Brosius",
    school: "Davis Middle School, 2012-Present",
    degrees: [
      "MA Educational Leadership - Ashland University",
      "Bachelor of Music Education - The Ohio State University"
    ],
    bio: `Mr. Brosius received the OSTA Young String Teacher of the Year Award for the 2015-2016 school year and served as OMEA South Central Region Orchestra Chair for 2016-2019. As a bassist, he performs with the Newark-Granville Symphony and regularly appears as a clinician and guest artist for The Ohio State University's "Bass Day" workshop and summer Bass Camp. Mr. Brosius lives in Dublin with his wife, Liz, daughter Molly, son Andrew, and cat Fozzie Bear Brosius.`,
    image: "https://www.dublinyouthstringorchestra.com/uploads/1/2/8/6/12866982/editor/dyso-02.jpg?1616688141"
  },
  {
    id: 4,
    name: "Mrs. Stephanie Hanson",
    school: "Sells Middle School, 2022-Present",
    degrees: [
      "Bachelor of Music Education - The Ohio State University"
    ],
    bio: `Mrs. Hanson is in her 10th year as an educator and fourth year in the Dublin City Schools as Director of Orchestras at John Sells Middle School. She has served as the Director of the Dublin Youth String Orchestra since 2025. Mrs. Hanson Graduated from The Ohio State University with a Bachelor's of Music Education. She is currently studying to receive her Master's in Conducting with Wes Kenney at Colorado State University.

Before coming to Dublin, Mrs. Hanson spent 5 years in Ashland City Schools, where she taught Orchestra to grades 4-12. Mrs. Hanson's ensembles have appeared at the OMEA Professional Development Conference, and her ensembles consistently receive Superior ratings at OMEA Large Group State Orchestra Contest and the Central Ohio String Festival in Upper Arlington. Mrs. Hanson has been a guest clinician for many programs across Ohio.

In her spare time, Mrs. Hanson enjoys hiking, exercising, and spending time with her family in the Leelanau Peninsula.`,
    image: "https://www.dublinyouthstringorchestra.com/uploads/1/2/8/6/12866982/published/img-7890.jpg?1761511561"
  },
  {
    id: 5,
    name: "Ms. Abigail Miles",
    school: "Eversole Run Middle School, 2025-Present",
    degrees: [
      "Bachelor of Music Education - Baldwin Wallace University"
    ],
    bio: `Ms. Miles is the orchestra director at Eversole Run Middle School in Dublin City Schools. She earned her Bachelor of Music Education degree from Baldwin Wallace University in 2019 and is currently pursuing her Master's degree in Music Education at The Ohio State University. Before joining the Dublin team, Ms. Miles taught 5th–12th grade orchestra in Perrysburg Schools in Perrysburg, Ohio, where her ensembles consistently earned superior ratings at OMEA Large Group contests. Her groups also performed multiple times at the OMEA State Professional Development Conference and the 2024 National Orchestra Festival in Louisville, Kentucky, as part of the ASTA National Convention.

In addition to her work in the classroom, Ms. Miles is an active performer and conductor. She has served as a conductor for the Baldwin Wallace University Middle School Strings Camp, Ohio State University Morning Strings Workshop and actively performs her cello throughout the state of Ohio. Abigail is passionate about providing inclusive, high-quality music education and fostering a lifelong love of music in her students.`,
    image: "https://www.dublinyouthstringorchestra.com/uploads/1/2/8/6/12866982/published/75b0a960-5099-4540-9519-82d885612086.jpg?1761511603"
  }
];