window.AppData = (() => {
  const seedAdmin = {
    username: "admin",
    password: "Admin@123"
  };

  const seedEmployees = [
    { id: 1, firstName: "Priya", lastName: "Prabhu", email: "priya.prabhu@uphirehr.com", phone: "9876543210", department: "Engineering", designation: "Software Engineer", salary: 850000, joinDate: "2021-03-15", status: "Active", workMode: "Hybrid" },
    { id: 2, firstName: "Arjun", lastName: "Sharma", email: "arjun.sharma@uphirehr.com", phone: "9876501122", department: "Marketing", designation: "Marketing Executive", salary: 620000, joinDate: "2020-07-01", status: "Active", workMode: "Onsite" },
    { id: 3, firstName: "Neha", lastName: "Kapoor", email: "neha.kapoor@uphirehr.com", phone: "9812345678", department: "HR", designation: "HR Executive", salary: 550000, joinDate: "2019-11-20", status: "Active", workMode: "Onsite" },
    { id: 4, firstName: "Rahul", lastName: "Verma", email: "rahul.verma@uphirehr.com", phone: "9123456780", department: "Finance", designation: "Financial Analyst", salary: 720000, joinDate: "2022-01-10", status: "Active", workMode: "Hybrid" },
    { id: 5, firstName: "Sneha", lastName: "Prasad", email: "sneha.prasad@uphirehr.com", phone: "9988776655", department: "Operations", designation: "Operations Manager", salary: 950000, joinDate: "2018-06-05", status: "Active", workMode: "Onsite" },
    { id: 6, firstName: "Vikram", lastName: "Raj", email: "vikram.raj@uphirehr.com", phone: "9001122334", department: "Engineering", designation: "Senior Developer", salary: 1100000, joinDate: "2017-09-12", status: "Active", workMode: "Remote" },
    { id: 7, firstName: "Ananya", lastName: "Singh", email: "ananya.singh@uphirehr.com", phone: "9870011223", department: "Marketing", designation: "Content Strategist", salary: 580000, joinDate: "2023-02-28", status: "Inactive", workMode: "Remote" },
    { id: 8, firstName: "Karthik", lastName: "Rajan", email: "karthik.rajan@uphirehr.com", phone: "9765432101", department: "Finance", designation: "Accounts Manager", salary: 800000, joinDate: "2020-04-17", status: "Active", workMode: "Hybrid" },
    { id: 9, firstName: "Lakshmi", lastName: "Chandran", email: "lakshmi.chandran@uphirehr.com", phone: "9345678901", department: "Marketing", designation: "Brand Manager", salary: 760000, joinDate: "2021-08-03", status: "Active", workMode: "Hybrid" },
    { id: 10, firstName: "Suraj", lastName: "Babu", email: "suraj.babu@uphirehr.com", phone: "9234567810", department: "Operations", designation: "Supply Chain Analyst", salary: 640000, joinDate: "2022-12-14", status: "Inactive", workMode: "Onsite" },
    { id: 11, firstName: "Meera", lastName: "Krishnan", email: "meera.krishnan@uphirehr.com", phone: "9012345671", department: "Engineering", designation: "QA Engineer", salary: 690000, joinDate: "2024-01-05", status: "Active", workMode: "Remote" },
    { id: 12, firstName: "Harish", lastName: "Iyer", email: "harish.iyer@uphirehr.com", phone: "9811100223", department: "HR", designation: "Talent Acquisition Specialist", salary: 610000, joinDate: "2023-10-11", status: "Active", workMode: "Hybrid" },
    { id: 13, firstName: "Pooja", lastName: "Ghosh", email: "pooja.ghosh@uphirehr.com", phone: "9887766554", department: "Engineering", designation: "DevOps Engineer", salary: 980000, joinDate: "2024-03-22", status: "Active", workMode: "Remote" },
    { id: 14, firstName: "Amit", lastName: "Joshi", email: "amit.joshi@uphirehr.com", phone: "9876541100", department: "Operations", designation: "Logistics Coordinator", salary: 560000, joinDate: "2024-06-18", status: "Active", workMode: "Onsite" },
    { id: 15, firstName: "Farah", lastName: "Ali", email: "farah.ali@uphirehr.com", phone: "9700011223", department: "Finance", designation: "Payroll Specialist", salary: 630000, joinDate: "2024-08-09", status: "Inactive", workMode: "Hybrid" },
    { id: 16, firstName: "Rohan", lastName: "Desai", email: "rohan.desai@uphirehr.com", phone: "9123400011", department: "Engineering", designation: "Frontend Developer", salary: 720000, joinDate: "2023-05-12", status: "Active", workMode: "Hybrid" },
    { id: 17, firstName: "Isha", lastName: "Mehta", email: "isha.mehta@uphirehr.com", phone: "9234500022", department: "Marketing", designation: "SEO Specialist", salary: 540000, joinDate: "2022-11-08", status: "Active", workMode: "Remote" },
    { id: 18, firstName: "Kiran", lastName: "Reddy", email: "kiran.reddy@uphirehr.com", phone: "9345600033", department: "HR", designation: "HR Manager", salary: 880000, joinDate: "2021-06-25", status: "Active", workMode: "Onsite" },
    { id: 19, firstName: "Aditya", lastName: "Kulkarni", email: "aditya.kulkarni@uphirehr.com", phone: "9456700044", department: "Finance", designation: "Investment Analyst", salary: 910000, joinDate: "2020-09-14", status: "Active", workMode: "Hybrid" },
    { id: 20, firstName: "Divya", lastName: "Nair", email: "divya.nair@uphirehr.com", phone: "9567800055", department: "Operations", designation: "Process Manager", salary: 770000, joinDate: "2023-01-19", status: "Active", workMode: "Onsite" },
    { id: 21, firstName: "Sandeep", lastName: "Patil", email: "sandeep.patil@uphirehr.com", phone: "9678900066", department: "Engineering", designation: "Backend Developer", salary: 950000, joinDate: "2022-03-10", status: "Active", workMode: "Remote" },
    { id: 22, firstName: "Pallavi", lastName: "Shah", email: "pallavi.shah@uphirehr.com", phone: "9789000077", department: "Marketing", designation: "Social Media Manager", salary: 600000, joinDate: "2024-02-11", status: "Active", workMode: "Hybrid" },
    { id: 23, firstName: "Nikhil", lastName: "Agarwal", email: "nikhil.agarwal@uphirehr.com", phone: "9890100088", department: "Finance", designation: "Tax Consultant", salary: 820000, joinDate: "2021-12-03", status: "Inactive", workMode: "Onsite" },
    { id: 24, firstName: "Swathi", lastName: "Rao", email: "swathi.rao@uphirehr.com", phone: "9901200099", department: "HR", designation: "Employee Relations Manager", salary: 870000, joinDate: "2023-07-21", status: "Active", workMode: "Hybrid" },
    { id: 25, firstName: "Manoj", lastName: "Kumar", email: "manoj.kumar@uphirehr.com", phone: "9012300100", department: "Operations", designation: "Operations Analyst", salary: 680000, joinDate: "2024-04-30", status: "Active", workMode: "Remote" }
  ];

  return {
    seedAdmin,
    seedEmployees
  };
})();