import { User } from '../types';

const HR_CREDENTIALS = {
  username: 'HR@vmcc-india.com',
  password: 'Hr@12345'
};

export const loginUser = (username: string, password: string): User | null => {
  // Check HR login
  if (username === HR_CREDENTIALS.username && password === HR_CREDENTIALS.password) {
    const user: User = {
      id: 'hr-1',
      username,
      role: 'HR'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  // Check employee login
  const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  const employee = employees.find((emp: any) => emp.username === username && emp.password === password);
  
  if (employee) {
    const user: User = {
      id: `emp-${employee.id}`,
      username,
      role: 'Employee',
      employeeId: employee.id
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};