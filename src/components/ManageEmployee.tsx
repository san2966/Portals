import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Users, Mail, Phone, GraduationCap, Briefcase } from 'lucide-react';
import { getEmployees, deleteEmployee } from '../utils/storage';
import { Employee } from '../types';

const ManageEmployee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; employee: Employee | null }>({
    isOpen: false,
    employee: null
  });
  const [deleteReason, setDeleteReason] = useState('');

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleDelete = (employee: Employee) => {
    setDeleteModal({ isOpen: true, employee });
    setDeleteReason('');
  };

  const confirmDelete = () => {
    if (deleteModal.employee && deleteReason.trim()) {
      deleteEmployee(deleteModal.employee.id);
      setEmployees(getEmployees());
      setDeleteModal({ isOpen: false, employee: null });
      setDeleteReason('');
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, employee: null });
    setDeleteReason('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Manage Employees</h2>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Employees Found</h3>
          <p className="text-gray-500">Add employees to see them here for management.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100 relative">
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200">
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(employee)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Employee Card Content */}
              <div className="pr-16">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {employee.employeeName.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{employee.employeeName}</h3>
                    <p className="text-sm text-gray-600">@{employee.username}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <Briefcase className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="font-medium">{employee.designation}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <Phone className="h-4 w-4 text-green-500 mr-2" />
                    <span>{employee.phoneNumber}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <Mail className="h-4 w-4 text-red-500 mr-2" />
                    <span className="truncate">{employee.emailId}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700">
                    <GraduationCap className="h-4 w-4 text-purple-500 mr-2" />
                    <span>{employee.degreeName}</span>
                  </div>
                  
                  {employee.specialization && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Specialization:</span> {employee.specialization}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Joined: {new Date(employee.dateOfJoining).toLocaleDateString()}</span>
                    <span className="capitalize">{employee.experienceType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Employee</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <strong>{deleteModal.employee?.employeeName}</strong>?
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for deletion <span className="text-red-500">*</span>
              </label>
              <textarea
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Please provide a reason for deleting this employee..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={!deleteReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployee;