import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Briefcase, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getEmployee } from '../utils/storage';
import { logout } from '../utils/auth';
import { Employee } from '../types';

const EmployeeDashboard: React.FC = () => {
  const { user, setUser } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (user?.employeeId) {
      const emp = getEmployee(user.employeeId);
      setEmployee(emp);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Employee Portal</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
              {employee.employeeName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {employee.employeeName}!</h2>
              <p className="text-gray-600">{employee.designation}</p>
              <p className="text-sm text-gray-500">Employee ID: {employee.username}</p>
            </div>
          </div>
        </div>

        {/* Employee Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              Personal Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-700">{employee.emailId}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-700">{employee.phoneNumber}</span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Address:</strong> {employee.address}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Blood Group:</strong> {employee.bloodGroup}
              </div>
            </div>
          </div>

          {/* Job Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
              Job Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-700">
                  Joined: {new Date(employee.dateOfJoining).toLocaleDateString()}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Designation:</strong> {employee.designation}
              </div>
              {employee.additionalCharge && (
                <div className="text-sm text-gray-700">
                  <strong>Additional Charge:</strong> {employee.additionalCharge}
                </div>
              )}
              <div className="text-sm text-gray-700">
                <strong>Experience Type:</strong> {employee.experienceType}
              </div>
            </div>
          </div>

          {/* Educational Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
              Educational Background
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <strong>Highest Education:</strong> {employee.highestEducation}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Degree:</strong> {employee.degreeName}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Specialization:</strong> {employee.specialization}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Institution:</strong> {employee.schoolCollege}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Year of Passing:</strong> {employee.yearOfPassing}
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              Family Information
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <strong>Father's Name:</strong> {employee.fatherName}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Father's Mobile:</strong> {employee.fatherMobile}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Mother's Name:</strong> {employee.motherName}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Mother's Mobile:</strong> {employee.motherMobile}
              </div>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        {employee.responsibilities && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed">{employee.responsibilities}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;