module.exports = [{
  createdAt: new Date(2018, 1, 1, 23, 59, 59),
  updatedAt: [new Date(2018, 3, 1, 23, 59, 59), new Date(2018, 3, 1, 23, 59, 59)],
  title: 'Computer Science',
  courseTitle: 'CS 101',
  // university: "UMT Lahore",
  description: 'Description of the course a little bit',
  tags: ['Computer Science', 'Assignment', 'Linked List'],
  instructor: {
    email: 'allan@umt.edu.pk',
    name: "Allan K. Miller"
  },
  verified_students: [
    {email: '12312312@umt.edu.pk'}
  ],
  assignments: [{
    createdAt: new Date(2018, 11, 1, 23, 59, 59),
    updatedAt: new Date(2018, 11, 1, 23, 59, 59),
    title: 'Assignment 01',
    description: 'Programming fundamentals. Build a linked list using pointers.',
    body: `### Create a class for building and matintaining an in memory linked linst.

    * link list should use pointer arithmatics.
    * it should not unnecessary memory and should check for memory leaks.
    
    [http://google.com](hello)
    `,
    deadline: new Date(2018, 1, 1, 23, 59, 59),
    notification_schedule: [new Date(2018, 1, 1, 23, 59, 59)],
    attatchments: [{
      title: "Pdf file",
      url: "https://google.com/abcd",
      mimeType: "text/pdf"
    }]
  },{
    createdAt: new Date(2018, 11, 1, 23, 59, 59),
    updatedAt: new Date(2018, 11, 1, 23, 59, 59),
    title: 'Assignment 02',
    description: 'Building classes and structs',
    body: '### body starts here',
    deadline: new Date(2018, 1, 1, 23, 59, 59),
    attatchments: [{
      title: "Instructions file",
      url: "https://google.com/abcd",
      mimeType: "text/html"
    }]
  
},{
    createdAt: new Date(2018, 4, 1, 23, 59, 59),
    updatedAt: new Date(2018, 7, 1, 23, 59, 59),
    title: 'Assignment 03',
    description: 'Writing higher order functions in javascript',
    body: '### body starts here',
    deadline: new Date(2018, 1, 1, 23, 59, 59)
}]
},{
  createdAt: new Date(2018, 7, 1, 23, 59, 59),
  updatedAt: new Date(2018, 3, 1, 23, 59, 59),

  title: 'Compiler Construction',
  description: 'Description of the course a little bit',
  courseTitle: 'CS 101',
  university: "UMT Lahore",
  tags: ['Windows 10', 'Bash', 'Powershell'],

  instructor: {
    email: 'allan@umt.edu.pk',
    name: "Allan K. Miller"
  },
  assignments: [{
    title: 'Assignment 01',
    description: 'Nice little description',
    body: '### body starts here',
    deadline: new Date(2018, 1, 1, 23, 59, 59)
  },{
    title: 'Assignment 01',
    description: 'Nice little description',
    body: '### body starts here',
    deadline: new Date(2018, 1, 1, 23, 59, 59)
  
},{
    title: 'Assignment 01',
    description: 'Nice little description',
    body: '### body starts here',
    deadline: new Date(2018, 12, 1, 23, 59, 59)
  
}]
}]