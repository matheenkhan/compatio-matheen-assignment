import React from 'react';
import { Formik } from 'formik';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useAppDispatch, useAppSelector } from '../hooks.ts'
import { add, edit } from './reducer/registration.tsx';

export const RegistrationForm = (props) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users?.users || []);

    return (
        <div>
            <h1>{props.showEditing && 'Editing Data!' || 'Registration!'}</h1>
            <Formik
                initialValues={(props.showEditing && props.values && props.values) || { name: '', email: '', age: '', address: '' }}
                enableReinitialize
                validate={values => {
                    const errors = {} as any;
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.name) {
                        errors.name = 'Required';
                    } else if (
                        !/^[a-zA-Z ]*$/i.test(values.name)
                    ) {
                        errors.name = 'Invalid name';
                    }
                    if (!values.address) {
                        errors.address = 'Required';
                    } else if (
                        !/^[a-zA-Z0-9\,\. ]*$/i.test(values.address)
                    ) {
                        errors.address = 'Invalid address';
                    }
                    if (!values.age) {
                        errors.age = 'Required';
                    } else if (
                        /[^0-9]/g.test(values.age)
                    ) {
                        errors.age = 'Invalid age';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        props?.showEditing ? dispatch(edit(values)) : dispatch(add(values));
                        setSubmitting(false);
                        resetForm();
                        props?.setEditing(false);
                        props?.setShowForm(false);
                    }, 255);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    resetForm
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='mainGrid'>
                            <label >Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            {(errors.name && touched.name && <span className='small'>{errors?.name}</span>) || (touched.name && !errors.name && <CheckCircleRoundedIcon style={{ alignSelf: 'center' }} />) || <div></div>}
                            <label >e-mail</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {(errors.email && touched.email && <span className='small'>{errors?.email}</span>) || (touched.email && !errors.email && <CheckCircleRoundedIcon style={{ alignSelf: 'center' }} />) || <div></div>}
                            <label >Age</label>
                            <input
                                type="text"
                                name="age"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                            />
                            {(errors.age && touched.age && <span className='small'>{errors?.age}</span>) || (touched.age && !errors.age && <CheckCircleRoundedIcon style={{ alignSelf: 'center' }} />) || <div></div>}
                            <label >Address</label>
                            <input
                                type="text"
                                name="address"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                            />
                            {(errors.address && touched.address && <span className='small'>{errors?.address}</span>) || (touched.address && !errors.address && <CheckCircleRoundedIcon style={{ alignSelf: 'center' }} />) || <div></div>}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Register User
                        </button>
                        {users.length > 0 && <button onClick={() => { props.setShowForm(false); props.setEditing(false); resetForm() }}>Cancel</button>}
                    </form>

                )}
            </Formik>
        </div>
    )
}