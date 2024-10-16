import React from 'react';
import { Collapse, Row, Col } from 'antd';
import InputField from './input-field';
import SliderField from './slider-field';
import ColorPicker from './color-picker';
import FontFamilyPicker from './font-picker';


const { Panel } = Collapse;

interface TextCustomizerProps {
  textSet: {
    id: number;
    text: string;
    fontFamily: string;
    top: number;
    left: number;
    color: string;
    fontSize: number;
    fontWeight: number;
    opacity: number;
    rotation: number;
    shadowColor: string;
    shadowSize: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAttributeChange: (id: number, attribute: string, value: any) => void;
  removeTextSet: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  duplicateTextSet: (textSet: any) => void;
}

const TextCustomizer: React.FC<TextCustomizerProps> = ({
  textSet,
  handleAttributeChange,
  // removeTextSet,
  // duplicateTextSet,
}) => {


  return (
    <>
      <Collapse accordion>
        <Panel header={textSet.text} key={textSet.id}>
          <InputField
            attribute="text"
            label="Text"
            currentValue={textSet.text}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <FontFamilyPicker
            attribute="fontFamily"
            currentFont={textSet.fontFamily}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <ColorPicker
                attribute="color"
                label="Text Color"
                currentColor={textSet.color}
                handleAttributeChange={(attribute, value) =>
                  handleAttributeChange(textSet.id, attribute, value)
                }
              />
            </Col>
          </Row>

          <SliderField
            attribute="left"
            label="X Position"
            min={-200}
            max={200}
            step={1}
            currentValue={textSet.left}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="top"
            label="Y Position"
            min={-100}
            max={100}
            step={1}
            currentValue={textSet.top}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="fontSize"
            label="Text Size"
            min={10}
            max={800}
            step={1}
            currentValue={textSet.fontSize}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="fontWeight"
            label="Font Weight"
            min={100}
            max={900}
            step={100}
            currentValue={textSet.fontWeight}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="opacity"
            label="Text Opacity"
            min={0}
            max={1}
            step={0.01}
            currentValue={textSet.opacity}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          <SliderField
            attribute="rotation"
            label="Rotation"
            min={-180}
            max={180}
            step={1}
            currentValue={textSet.rotation}
            handleAttributeChange={(attribute, value) =>
              handleAttributeChange(textSet.id, attribute, value)
            }
          />
          {/* <div className="flex flex-row flex-wrap gap-2 my-8">
            <Button onClick={() => duplicateTextSet(textSet)} className='w-full'>
              Duplicate Text Set
            </Button>
            <Button onClick={() => removeTextSet(textSet.id)} danger className='w-full'>
              Remove Text Set
            </Button>
          </div> */}
        </Panel>
      </Collapse>
    </>
  );
};

export default TextCustomizer;
