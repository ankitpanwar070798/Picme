import React, { useState } from 'react';
import { Button, Dropdown, Input, Menu } from 'antd';
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
import { fonts } from './fonts';

interface FontFamilyPickerProps { 
  attribute: string;
  currentFont: string;
  handleAttributeChange: (attribute: string, value: string) => void;
}

const FontFamilyPicker: React.FC<FontFamilyPickerProps> = ({
  attribute,
  currentFont,
  handleAttributeChange,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredFonts = fonts.filter((font) =>
    font.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menu = (
    <Menu>
      <Menu.Item key="search" disabled>
        <Input
          placeholder="Search font family..."
          value={searchTerm}
          onChange={handleSearchChange}
          allowClear
        />
      </Menu.Item>
      {filteredFonts.length > 0 ? (
        filteredFonts.map((font) => (
          <Menu.Item
            key={font}
            style={{ fontFamily: font }}
            onClick={() => handleAttributeChange(attribute, font)}
          >
            {font}
            {currentFont === font && <CheckOutlined style={{ float: 'right' }} />}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>No font family found.</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ marginBottom: '8px', display: 'block' }}>Font Family</label>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button style={{ width: 'fit-content', textAlign: 'left' }}>
          {currentFont ? currentFont : 'Select font family'}
          <DownOutlined style={{ float: 'right' }} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default FontFamilyPicker;
