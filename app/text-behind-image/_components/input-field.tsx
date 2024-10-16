import React from 'react';
import { Input, Form } from 'antd';

interface InputFieldProps {
  attribute: string;
  label: string;
  currentValue: string;
  handleAttributeChange: (attribute: string, value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  attribute,
  label,
  currentValue,
  handleAttributeChange
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleAttributeChange(attribute, value);
  };

  return (
    <Form.Item
      label={label}  // Label is handled by Ant Design's Form.Item
      name={attribute}
    >
      <Input
        type="text"
        placeholder='Enter text'
        value={currentValue}
        onChange={handleInputChange}
      />
    </Form.Item>
  );
};

export default InputField;
