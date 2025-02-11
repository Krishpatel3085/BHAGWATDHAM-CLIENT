import React, { useState } from 'react';
import {
    Send,
    User,
    Mail,
    BookOpen,
    GraduationCap,
    Upload
} from 'lucide-react';
import { Header } from '../components/Header';
import MainSection from '../components/MainSection';

const AdmissionForm = () => {
    const [formData, setFormData] = useState({

    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phone || !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Valid phone number is required';
        }
        if (!formData.lastInstitution) newErrors.lastInstitution = 'Last institution is required';
        if (!formData.highestQualification) newErrors.highestQualification = 'Highest qualification is required';
        if (!formData.grade) newErrors.grade = 'Grade/Percentage is required';
        if (!formData.course) newErrors.course = 'Course selection is required';

        if (!formData.photo) newErrors.photo = 'Passport photo is required';
        if (!formData.markSheets) newErrors.markSheets = 'Mark sheets are required';
        if (!formData.idProof) newErrors.idProof = 'ID proof is required';

        if (!formData.declaration) newErrors.declaration = 'Please accept the declaration';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const courses = [
        'Computer Science',
        'Business Administration',
        'Engineering',
        'Arts & Humanities',
        'Medical Sciences',
        'Law'
    ];

    const renderField = (label, name, type = 'text', options = {}) => {
        const baseClasses = "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent";

        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    {label} {options.required && <span className="text-red-500">*</span>}
                </label>
                {type === 'select' ? (
                    <select
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={baseClasses}
                        required={options.required}
                    >
                        <option value="">Select {label}</option>
                        {options.items?.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                ) : type === 'textarea' ? (
                    <textarea
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        rows="4"
                        className={baseClasses}
                        required={options.required}
                    />
                ) : type === 'file' ? (
                    <input
                        type="file"
                        name={name}
                        onChange={handleChange}
                        className={`${baseClasses} file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
                        required={options.required}
                        accept={options.accept}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={baseClasses}
                        required={options.required}
                        {...options}
                    />
                )}
                {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
            </div>
        );
    };

    return (
        <>
            {/* header */}
            <Header />

            {/* Mian section */}
            <MainSection />
            <div className="min-h-screen  bg-background py-12 px-4 sm:px-6 lg:px-8">

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-black mb-4">
                            Admission Application
                        </h1>
                        <p className="text-lg text-gray-600">
                            Begin your journey towards excellence in education
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8">
                        {/* Personal Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <User className="mr-2" size={20} />
                                Personal Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('Full Name', 'fullName', 'text', { required: true })}
                                {renderField('Date of Birth', 'dateOfBirth', 'date', { required: true })}
                                {renderField('Gender', 'gender', 'select', { required: true, items: ['Male', 'Female', 'Other'] })}
                                {renderField('Nationality', 'nationality', 'text', { required: true })}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <Mail className="mr-2" size={20} />
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('Email Address', 'email', 'email', { required: true })}
                                {renderField('Phone Number', 'phone', 'tel', { required: true })}
                                <div className="col-span-1 md:col-span-2">
                                    {renderField('Address', 'address', 'textarea', { required: true })}
                                </div>
                            </div>
                        </div>

                        {/* Educational Background */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <GraduationCap className="mr-2" size={20} />
                                Educational Background
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('Last Institution Attended', 'lastInstitution', 'text', { required: true })}
                                {renderField('Highest Qualification', 'highestQualification', 'text', { required: true })}
                                {renderField('Percentage/Grade', 'grade', 'text', { required: true })}
                            </div>
                        </div>

                        {/* Course Selection */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <BookOpen className="mr-2" size={20} />
                                Course Selection
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderField('Course Applying For', 'course', 'select', { required: true, items: courses })}
                                {renderField('Preferred Batch/Session', 'preferredBatch', 'select', {
                                    items: ['Morning', 'Afternoon', 'Evening', 'Weekend']
                                })}
                            </div>
                        </div>

                        {/* Document Uploads */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <Upload className="mr-2" size={20} />
                                Document Uploads
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {renderField('Passport Size Photo', 'photo', 'file', {
                                    required: true,
                                    accept: 'image/*'
                                })}
                                {renderField('Mark Sheets', 'markSheets', 'file', {
                                    required: true,
                                    accept: '.pdf,.doc,.docx'
                                })}
                                {renderField('ID Proof', 'idProof', 'file', {
                                    required: true,
                                    accept: '.pdf,.jpg,.jpeg,.png'
                                })}
                            </div>
                        </div>

                        {/* Declaration */}
                        <div className="mb-8">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="declaration"
                                    checked={formData.declaration}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    required
                                />
                                <label className="text-sm text-gray-700">
                                    I confirm that the information provided is accurate and complete
                                </label>
                            </div>
                            {errors.declaration && (
                                <p className="text-red-500 text-sm mt-1">{errors.declaration}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 ">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <Send className="mr-2" size={20} />
                                Submit Application
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    );
};

export default AdmissionForm;