export interface Employee {
  id: string;
  // Basic Information
  employeeName: string;
  photo?: string;
  address: string;
  phoneNumber: string;
  emailId: string;
  aadharNumber: string;
  panNumber: string;
  bloodGroup: string;
  fatherName: string;
  fatherMobile: string;
  motherName: string;
  motherMobile: string;
  
  // Educational Information
  highestEducation: string;
  degreeName: string;
  specialization: string;
  schoolCollege: string;
  boardUniversity: string;
  yearOfPassing: string;
  status: 'Passed' | 'Appearing';
  marksPercentage?: string;
  certifications: string;
  
  // Experience Information
  experienceType: 'Fresher' | 'Experienced';
  organizationName?: string;
  postHeld?: string;
  jobPeriodFrom?: string;
  jobPeriodTo?: string;
  reasonLeaving?: string;
  previousCTC?: string;
  totalExperience?: string;
  
  // Office Use
  dateOfJoining: string;
  designation: string;
  additionalCharge: string;
  responsibilities: string;
  username: string;
  password: string;
  
  createdAt: string;
}

export interface HRProfile {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  designation: string;
  profilePhoto?: string;
}

export interface User {
  id: string;
  username: string;
  role: 'HR' | 'Employee';
  employeeId?: string;
}