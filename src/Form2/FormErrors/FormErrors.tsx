const FormErrors = ({ errors }: { errors: string[] }) => {
    return (
        <div className={"w-form-errors"}>
            {errors.map((el, index) => (
                <div key={index}>{el}</div>
            ))}
        </div>
    );
};
export default FormErrors;
