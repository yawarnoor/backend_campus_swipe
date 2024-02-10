const mockDataUsers = [
    {
      id: 1,
      name: "Tony Stark",
      email: "tony.stark@gmail.com",
      age: 45,
      phone: "(665)121-5454",
      address: "10880 Malibu Point, Malibu, CA 90265",
      city: "Malibu",
      zipCode: "90265",
      CMSID: "023-21-0001",
    },
    {
      id: 2,
      name: "Steve Rogers",
      email: "steve.rogers@gmail.com",
      age: 100,
      phone: "(421)314-2288",
      address: "569 Leaman Place, Brooklyn, NY 11238",
      city: "New York",
      zipCode: "11238",
      CMSID: "023-21-0002",
    },
    // ... (other user data)
  ];
  
  const mockDataTeam = [
    {
      id: 1,
      name: "Tony Stark",
      email: "tony.stark@gmail.com",
      age: 45,
      phone: "(665)121-5454",
      access: "Admin",
    },
    {
      id: 2,
      name: "Steve Rogers",
      email: "steve.rogers@gmail.com",
      age: 100,
      phone: "(421)314-2288",
      access: "User Manager",
    },
    {
      id: 3,
      name: "Natasha Romanoff",
      email: "natasha.romanoff@gmail.com",
      age: 35,
      phone: "(422)982-6739",
      access: "Transport Manager",
    },
    {
      id: 4,
      name: "Bruce Banner",
      email: "bruce.banner@gmail.com",
      age: 48,
      phone: "(921)425-6742",
      access: "Access Control Manager",
    },
    {
      id: 5,
      name: "Thor Odinson",
      email: "thor.odinson@gmail.com",
      age: 1500,
      phone: "(421)445-1189",
      access: "Support",
    },
  ];
  
  const mockDataTransactions = [
    {
      id: 1,
      studentId: "023-21-0001",
      studentName: "Tony Stark",
      transactionType: "Entry",
      location: "Avengers Tower",
      dateAndTime: "2023-01-15T09:30:00",
      deviceUsed: "RFID Reader 1",
      transactionStatus: "Success",
    },
    {
      id: 2,
      studentId: "023-21-0002",
      studentName: "Steve Rogers",
      transactionType: "Exit",
      location: "SHIELD Headquarters",
      dateAndTime: "2023-01-15T12:45:00",
      deviceUsed: "RFID Reader 2",
      transactionStatus: "Failed",
    },
    {
      id: 3,
      studentId: "023-21-0003",
      studentName: "Natasha Romanoff",
      transactionType: "Entry",
      location: "Black Widow Base",
      dateAndTime: "2023-01-16T10:15:00",
      deviceUsed: "RFID Reader 3",
      transactionStatus: "Success",
    },
    // ... (other transactions)
  ];
  
  module.exports = {
    mockDataTeam,
    mockDataTransactions,
    mockDataUsers
  };
  