import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import styles from '../formStyles.module.css';
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

export default function LoginForm() {
    const fieldId = useId();
    const dispatch = useDispatch()
    const handleSubmit = (values, actions) => {
        actions.resetForm();
        console.log(values);
        dispatch(logIn(values))

    };

    const UserSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .min(3, "Too short")
            .max(25, "Too long")
            .required("Required"),
        password: Yup.string()
            .min(7, "Too short")
            .required("Required"),
    });

    return (
        <Formik
            initialValues={{
                password: "",
                email: "",
            }}
            validationSchema={UserSchema}
            onSubmit={handleSubmit}
        >
            <Form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor={`${fieldId}-email`}>Email</label>
                    <Field type="text" name="email" id={`${fieldId}-email`} className={styles.inputField} />
                    <ErrorMessage className={styles.errorMessage} name="email" component="span" />
                </div>

    
                <div className={styles.formGroup}>
                    <label htmlFor={`${fieldId}-password`}>Password</label>
                    <Field type="password" name="password" id={`${fieldId}-password`} className={styles.inputField} />
                    <ErrorMessage className={styles.errorMessage} name="password" component="span" />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Add contact
                </button>
            </Form>
        </Formik>
    );
}
