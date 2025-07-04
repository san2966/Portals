import { Employee, HRProfile } from '../types';

export const saveEmployee = (employee: Employee): void => {
  const employees = getEmployees();
  const existingIndex = employees.findIndex(emp => emp.id === employee.id);
  
  if (existingIndex >= 0) {
    employees[existingIndex] = employee;
  } else {
    employees.push(employee);
  }
  
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const getEmployees = (): Employee[] => {
  return JSON.parse(localStorage.getItem('employees') || '[]');
};

export const deleteEmployee = (employeeId: string): void => {
  const employees = getEmployees();
  const filtered = employees.filter(emp => emp.id !== employeeId);
  localStorage.setItem('employees', JSON.stringify(filtered));
};

export const getEmployee = (employeeId: string): Employee | null => {
  const employees = getEmployees();
  return employees.find(emp => emp.id === employeeId) || null;
};

export const saveHRProfile = (profile: HRProfile): void => {
  localStorage.setItem('hrProfile', JSON.stringify(profile));
};

export const getHRProfile = (): HRProfile | null => {
  const profile = localStorage.getItem('hrProfile');
  return profile ? JSON.parse(profile) : null;
};