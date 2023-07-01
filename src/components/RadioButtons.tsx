import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type RadioButton = {
  value: string;
  label: string;
};

export type RadioButtonsProps = {
  name: string;
  buttons: RadioButton[];
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
};

function RadioButtons(props: RadioButtonsProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onValueChange(e.target.value);
  };

  return (
    <>
      {
        props.buttons.map((btn) => (
          <div key={`radio-button-${props.name}-${btn.value}`}>
            <input
              type="radio"
              name={props.name}
              value={btn.value}
              id={btn.value}
              checked={props.value == btn.value}
              onChange={onChange}/>
            <label htmlFor={btn.value}>{ btn.label }</label>
          </div>
        ))
      }
    </>
  );
}

export default RadioButtons;
