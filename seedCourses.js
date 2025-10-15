const mongoose = require('mongoose');
const Course = require('./models/courses');

mongoose.connect('mongodb+srv://akankshamishra20042:Akanksha@cluster0.hqrhf8d.mongodb.net/?retryWrites=true&w=majority&appName=cluster0');

const courses = [
  // CSE
  { courseName: "Introduction to Programming", department: "CSE", code: "CS101", description: "Basics of programming concepts and problem solving", instructor: "Dr. Smith", schedule: "Mon, Wed, Fri - 9:00 AM" },
  { courseName: "Data Structures and Algorithms", department: "CSE", code: "CS201", description: "Advanced data structures and algorithm analysis", instructor: "Dr. Johnson", schedule: "Tue, Thu - 11:00 AM" },
  { courseName: "Database Management Systems", department: "CSE", code: "CS301", description: "Database design and SQL", instructor: "Prof. Anderson", schedule: "Mon, Wed - 2:00 PM" },
  { courseName: "Computer Networks", department: "CSE", code: "CS401", description: "Network protocols and architecture", instructor: "Dr. Wilson", schedule: "Tue, Thu - 3:00 PM" },

  // ECE
  { courseName: "Digital Electronics", department: "ECE", code: "EC101", description: "Logic gates and digital circuits", instructor: "Dr. Rao", schedule: "Mon, Wed - 10:00 AM" },
  { courseName: "Analog Electronics", department: "ECE", code: "EC201", description: "Analog circuit design and analysis", instructor: "Prof. Kumar", schedule: "Tue, Thu - 1:00 PM" },
  { courseName: "Microprocessors", department: "ECE", code: "EC301", description: "Architecture and programming of microprocessors", instructor: "Dr. Chen", schedule: "Wed, Fri - 11:00 AM" },
  { courseName: "Communication Systems", department: "ECE", code: "EC401", description: "Analog and digital communication", instructor: "Prof. Martinez", schedule: "Mon, Thu - 2:00 PM" },

  // ME
  { courseName: "Engineering Mechanics", department: "ME", code: "ME101", description: "Statics and dynamics", instructor: "Dr. Thompson", schedule: "Mon, Wed - 9:00 AM" },
  { courseName: "Thermodynamics", department: "ME", code: "ME201", description: "Heat transfer and energy systems", instructor: "Prof. Brown", schedule: "Tue, Thu - 10:00 AM" },
  { courseName: "Machine Design", department: "ME", code: "ME301", description: "Design of mechanical components", instructor: "Dr. Garcia", schedule: "Wed, Fri - 1:00 PM" },
  { courseName: "Manufacturing Processes", department: "ME", code: "ME401", description: "Modern manufacturing techniques", instructor: "Prof. Lee", schedule: "Mon, Thu - 3:00 PM" },

  // CE
  { courseName: "Structural Analysis", department: "CE", code: "CE101", description: "Analysis of civil structures", instructor: "Dr. Taylor", schedule: "Mon, Wed - 11:00 AM" },
  { courseName: "Soil Mechanics", department: "CE", code: "CE201", description: "Properties and behavior of soils", instructor: "Prof. White", schedule: "Tue, Thu - 2:00 PM" },
  { courseName: "Transportation Engineering", department: "CE", code: "CE301", description: "Highway and traffic engineering", instructor: "Dr. Rodriguez", schedule: "Wed, Fri - 10:00 AM" },
  { courseName: "Environmental Engineering", department: "CE", code: "CE401", description: "Water and waste management", instructor: "Prof. Miller", schedule: "Mon, Thu - 1:00 PM" },

  // EE
  { courseName: "Circuit Theory", department: "EE", code: "EE101", description: "Basic electrical circuits", instructor: "Dr. Clark", schedule: "Mon, Wed - 8:00 AM" },
  { courseName: "Power Systems", department: "EE", code: "EE201", description: "Electrical power generation and distribution", instructor: "Prof. Davis", schedule: "Tue, Thu - 9:00 AM" },
  { courseName: "Control Systems", department: "EE", code: "EE301", description: "Feedback control and automation", instructor: "Dr. Zhang", schedule: "Wed, Fri - 2:00 PM" },
  { courseName: "Electric Machines", department: "EE", code: "EE401", description: "Motors and generators", instructor: "Prof. Adams", schedule: "Mon, Thu - 11:00 AM" }

  
  // ...add more for each department
  
];

Course.insertMany(courses)
  .then(() => {
    console.log('Courses seeded!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
