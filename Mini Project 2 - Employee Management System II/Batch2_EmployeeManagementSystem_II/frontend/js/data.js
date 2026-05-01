window.AppData = (() => {
  const seedAdmin = {
    username: "admin",
    password: "Admin@123"
  };

  const seedEmployees = [
    { id: 1, firstName: "Priya", lastName: "Prabhu", email: "priya.prabhu@aurorahr.com", phone: "9876543210", department: "Engineering", designation: "Software Engineer", salary: 850000, joinDate: "2021-03-15", status: "Active", workMode: "Hybrid" },
    { id: 2, firstName: "Arjun", lastName: "Sharma", email: "arjun.sharma@aurorahr.com", phone: "9876501122", department: "Marketing", designation: "Marketing Executive", salary: 620000, joinDate: "2020-07-01", status: "Active", workMode: "Onsite" },
    { id: 3, firstName: "Neha", lastName: "Kapoor", email: "neha.kapoor@aurorahr.com", phone: "9812345678", department: "HR", designation: "HR Executive", salary: 550000, joinDate: "2019-11-20", status: "Active", workMode: "Onsite" },
    { id: 4, firstName: "Rahul", lastName: "Verma", email: "rahul.verma@aurorahr.com", phone: "9123456780", department: "Finance", designation: "Financial Analyst", salary: 720000, joinDate: "2022-01-10", status: "Active", workMode: "Hybrid" },
    { id: 5, firstName: "Sneha", lastName: "Prasad", email: "sneha.prasad@aurorahr.com", phone: "9988776655", department: "Operations", designation: "Operations Manager", salary: 950000, joinDate: "2018-06-05", status: "Active", workMode: "Onsite" },
    { id: 6, firstName: "Vikram", lastName: "Raj", email: "vikram.raj@aurorahr.com", phone: "9001122334", department: "Engineering", designation: "Senior Developer", salary: 1100000, joinDate: "2017-09-12", status: "Active", workMode: "Remote" },
    { id: 7, firstName: "Ananya", lastName: "Singh", email: "ananya.singh@aurorahr.com", phone: "9870011223", department: "Marketing", designation: "Content Strategist", salary: 580000, joinDate: "2023-02-28", status: "Inactive", workMode: "Remote" },
    { id: 8, firstName: "Karthik", lastName: "Rajan", email: "karthik.rajan@aurorahr.com", phone: "9765432101", department: "Finance", designation: "Accounts Manager", salary: 800000, joinDate: "2020-04-17", status: "Active", workMode: "Hybrid" },
    { id: 9, firstName: "Lakshmi", lastName: "Chandran", email: "lakshmi.chandran@aurorahr.com", phone: "9345678901", department: "Marketing", designation: "Brand Manager", salary: 760000, joinDate: "2021-08-03", status: "Active", workMode: "Hybrid" },
    { id: 10, firstName: "Suraj", lastName: "Babu", email: "suraj.babu@aurorahr.com", phone: "9234567810", department: "Operations", designation: "Supply Chain Analyst", salary: 640000, joinDate: "2022-12-14", status: "Inactive", workMode: "Onsite" },
    { id: 11, firstName: "Meera", lastName: "Krishnan", email: "meera.krishnan@aurorahr.com", phone: "9012345671", department: "Engineering", designation: "QA Engineer", salary: 690000, joinDate: "2024-01-05", status: "Active", workMode: "Remote" },
    { id: 12, firstName: "Harish", lastName: "Iyer", email: "harish.iyer@aurorahr.com", phone: "9811100223", department: "HR", designation: "Talent Acquisition Specialist", salary: 610000, joinDate: "2023-10-11", status: "Active", workMode: "Hybrid" },
    { id: 13, firstName: "Pooja", lastName: "Ghosh", email: "pooja.ghosh@aurorahr.com", phone: "9887766554", department: "Engineering", designation: "DevOps Engineer", salary: 980000, joinDate: "2024-03-22", status: "Active", workMode: "Remote" },
    { id: 14, firstName: "Amit", lastName: "Joshi", email: "amit.joshi@aurorahr.com", phone: "9876541100", department: "Operations", designation: "Logistics Coordinator", salary: 560000, joinDate: "2024-06-18", status: "Active", workMode: "Onsite" },
    { id: 15, firstName: "Farah", lastName: "Ali", email: "farah.ali@aurorahr.com", phone: "9700011223", department: "Finance", designation: "Payroll Specialist", salary: 630000, joinDate: "2024-08-09", status: "Inactive", workMode: "Hybrid" }
  ];

  return {
    seedAdmin,
    seedEmployees
  };
})();