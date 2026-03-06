import React, { useState } from 'react';
import { Pencil, User, Book, LayoutGrid, Calendar, ChevronDown, Star } from 'lucide-react';

const StarRating = ({ initialRating = 0 }) => {
    const [rating, setRating] = useState(initialRating);
    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={22}
                    fill={star <= rating ? '#58C27D' : '#F4EA6E'}
                    color={star <= rating ? '#58C27D' : '#F4EA6E'}
                    style={{ cursor: 'pointer', transition: 'transform 0.1s' }}
                    onClick={() => setRating(star)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            ))}
        </div>
    );
};

const SectionHeader = ({ title }) => (
    <div style={{
        backgroundColor: '#F3ECFF',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        marginTop: '1.5rem',
        marginBottom: '0.5rem'
    }}>
        <h3 style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#715A9A',
            letterSpacing: '0.05em',
            margin: 0,
            textTransform: 'uppercase'
        }}>{title}</h3>
    </div>
);

const RatingRow = ({ label, initialRating }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 0',
        borderBottom: '1px solid #F0EBFA'
    }}>
        <span style={{ color: '#6A6F85', fontSize: '0.95rem' }}>{label}</span>
        <StarRating initialRating={initialRating} />
    </div>
);

const InputWrapper = ({ label, required, children, style }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', ...style }}>
        <label style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#715A9A',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
        }}>
            {label} {required && <span style={{ color: '#E04F5E' }}>*</span>}
        </label>
        {children}
    </div>
);

const Feedback = () => {
    return (
        <div style={{
            minHeight: '100vh',
            padding: '8rem 2rem 4rem',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#F3E8FF', // Soft purple background from the design
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                position: 'relative',
                background: 'white',
                borderRadius: '1.5rem',
                width: '100%',
                maxWidth: '700px',
                padding: '3rem 2.5rem',
                boxShadow: '0 20px 40px -10px rgba(75, 40, 140, 0.1)',
            }}>
                {/* Top Floating Icon */}
                <div style={{
                    position: 'absolute',
                    top: '-1.8rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#E6D7FF',
                    width: '3.6rem',
                    height: '3.6rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(109, 40, 217, 0.15)'
                }}>
                    <Pencil size={20} color="#6D28D9" />
                </div>

                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: '#413A58',
                        marginBottom: '0.5rem'
                    }}>
                        Submit Your Feedback
                    </h1>
                    <p style={{ color: '#6A6F85', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto', lineHeight: 1.5 }}>
                        Please fill out the form below to provide your insights and help improve the course quality.
                    </p>
                </div>

                {/* Form Fields Section 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {/* Faculty Name */}
                    <InputWrapper label="Faculty Name" required>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#FCFAFF',
                            border: '1px solid #EBE4FF',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                        }}>
                            <User size={18} color="#A79EBF" style={{ marginRight: '0.75rem' }} />
                            <select style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: '#A79EBF',
                                fontSize: '0.95rem',
                                appearance: 'none',
                                cursor: 'pointer'
                            }}>
                                <option value="">Select faculty</option>
                                <option value="1">Dr. Alan Turing</option>
                                <option value="2">Prof. Ada Lovelace</option>
                            </select>
                            <ChevronDown size={16} color="#A79EBF" />
                        </div>
                    </InputWrapper>

                    {/* Course Name */}
                    <InputWrapper label="Course Name" required>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#FCFAFF',
                            border: '1px solid #EBE4FF',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                        }}>
                            <Book size={18} color="#A79EBF" style={{ marginRight: '0.75rem' }} />
                            <input
                                placeholder="Enter course name"
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: '#413A58',
                                    fontSize: '0.95rem',
                                }}
                            />
                        </div>
                    </InputWrapper>
                </div>

                {/* Form Fields Section 2: 4 Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                    <InputWrapper label="Department">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#F3ECFF', // Slightly darker to match image for this specific input
                            border: '1px solid #EBE4FF',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 0.5rem',
                        }}>
                            <LayoutGrid size={16} color="#A79EBF" style={{ marginRight: '0.5rem' }} />
                            <select style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#6A6F85', fontSize: '0.85rem', appearance: 'none' }}>
                                <option value="">Select department</option>
                            </select>
                        </div>
                    </InputWrapper>

                    <InputWrapper label="Semester">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#FCFAFF',
                            border: '1px solid #EBE4FF',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 0.5rem',
                        }}>
                            <Calendar size={16} color="#A79EBF" style={{ marginRight: '0.5rem' }} />
                            <select style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#6A6F85', fontSize: '0.85rem', appearance: 'none' }}>
                                <option value="">--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                            <ChevronDown size={14} color="#A79EBF" />
                        </div>
                    </InputWrapper>

                    <InputWrapper label="Semester">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#FCFAFF',
                            border: '1px solid #EBE4FF',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 0.5rem',
                        }}>
                            <select style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#A79EBF', fontSize: '0.85rem', appearance: 'none' }}>
                                <option value="">Select semester</option>
                            </select>
                            <ChevronDown size={14} color="#A79EBF" />
                        </div>
                    </InputWrapper>

                    <InputWrapper label="Section">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#FCFAFF',
                            border: '1px solid #EBE4FF',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 0.5rem',
                        }}>
                            <select style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#A79EBF', fontSize: '0.85rem', appearance: 'none' }}>
                                <option value="">Select sec</option>
                            </select>
                            <ChevronDown size={14} color="#A79EBF" />
                        </div>
                    </InputWrapper>
                </div>

                {/* Rating Sections */}

                <SectionHeader title="Teaching Quality" />
                <div style={{ padding: '0 0.5rem', marginBottom: '1.5rem' }}>
                    <RatingRow label="Clarity of explanation by the faculty" initialRating={3} />
                    <RatingRow label="Knowledge of the subject" initialRating={4} />
                    <RatingRow label="Ability to answer student questions" initialRating={4} />
                    <RatingRow label="Engagement during lectures" initialRating={3} />
                    <RatingRow label="Use of examples and real-world applications" initialRating={4} />
                </div>

                <SectionHeader title="Course Structure" />
                <div style={{ padding: '0 0.5rem', marginBottom: '1.5rem' }}>
                    <RatingRow label="Course syllabus organization" initialRating={4} />
                    <RatingRow label="Quality of course materials" initialRating={4} />
                    <RatingRow label="Pace of the course" initialRating={4} />
                    <RatingRow label="Relevance of assignments" initialRating={4} />
                    <RatingRow label="Difficulty level of the course" initialRating={4} />
                </div>

                <div style={{ padding: '0 0.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <SectionHeader title="Faculty Interaction" />
                        <div style={{ padding: '0 0.5rem' }}>
                            <RatingRow label="Faculty availability outside class" initialRating={4} />
                            <RatingRow label="Encouragement of student participation" initialRating={4} />
                            <RatingRow label="Feedback provided on assignments" initialRating={4} />
                        </div>
                    </div>
                    {/* The image appears to just have 1 column for ratings under "Faculty Interaction" heading but also another right heading "Learning Experience". Wait, actually the image layout for this bottom part is:
                    Heading 1: FACULTY INTERACTION       Heading 2: LEARNING EXPERIENCE 
                    And underneath there are rows. But it looks like the rows just span the full width just like the above rows.
                    Let's just use a single column like the above sections. The design might have a slight variation but a single column list is the most logical parsing of that section. 
                    Wait, let's stick to full width rows to match the screenshot stars alignment.
                    I will update this.
                    */}
                </div>

                {/* Correct mapping for bottom section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', backgroundColor: '#F3ECFF', borderRadius: '0.5rem', padding: '0.75rem 1rem' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#715A9A', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>Faculty Interaction</h3>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#715A9A', letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase' }}>Learning Experience</h3>
                </div>
                {/* On second glance, the stars are on the right as usual. "Learning experience" could just be a label on the right side of the header bar. Let's just make it a standard Section. */}
                <div style={{ padding: '0 0.5rem', marginBottom: '2.5rem' }}>
                    <RatingRow label="Faculty availability outside class" initialRating={4} />
                    <RatingRow label="Encouragement of student participation" initialRating={4} />
                    <RatingRow label="Feedback provided on assignments" initialRating={4} />
                </div>


                {/* Submit Button */}
                <button style={{
                    width: '100%',
                    padding: '1.1rem',
                    backgroundColor: '#56B579', // Matches the image submit button color
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(86, 181, 121, 0.3)',
                    transition: 'transform 0.1s, box-shadow 0.1s'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(86, 181, 121, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(86, 181, 121, 0.3)';
                    }}
                >
                    Submit Feedback
                </button>

            </div>

            {/* Footer Text */}
            <div style={{ position: 'absolute', bottom: '2rem', textAlign: 'center', width: '100%', left: 0 }}>

            </div>
        </div>
    );
};

export default Feedback;
