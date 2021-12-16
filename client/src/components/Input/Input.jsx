import { FormInput } from "./Input.styled";

const Input = (props) => {
  return (
    <div>
      <FormInput
        onChange={(e) => props.setValue(e.target.value)}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
