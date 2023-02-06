import { Formik, Field, Form } from 'formik';

export default function Create_Account_form() {
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}

            onSubmit={() => {

            }}
        >
            <Form>
                <div>Create new Account:</div>
                <Field id="username" name="username" placeholder="Username" />
                <Field type="password" id="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </Form>
        </Formik>
    )
}