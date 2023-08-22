import {
  DatePicker,
  SpinButton,
  TextField,
  DefaultButton,
} from "@fluentui/react";
import { useEffect, useState } from "react";

const FormField = ({ field, onChange }) => {
  const handleOnChange = (e) => {
    e.preventDefault();

    onChange({ [field.id]: e.target.value });
  };

  const handleDateChange = (date) => {
    onChange({ [field.id]: date });
  };

  const handleSpinChange = (value) => {
    onChange({ [field.id]: value})
  }

  return (
    <div className="w-full">
      {!field.type && <div className="h-[82px]"></div>}
      {field.type == "TitleField" && (
        <TextField
          className="border-2 border-black p-2 h-full"
          onChange={handleOnChange}
          label={field.name}
        />
      )}

      {field.type == "DescField" && (
        <TextField
          className="border-2 border-black p-2 h-full"
          onChange={handleOnChange}
          label={field.name}
          multiline
          rows={4}
        />
      )}

      {field.type == "TextField" && (
        <TextField
          className="border-2 border-black p-2 h-full"
          onChange={handleOnChange}
          label={field.name}
        />
      )}

      {field.type == "SpinButton" && (
        <div className="h-[80px] flex items-center">
          <SpinButton
            className="border-2 border-black p-2 h-fit"
            label={field.name}
            onChange={(e, value) => handleSpinChange(value)}
          />
        </div>
      )}

      {field.type == "DatePicker" && (
        <DatePicker
          className="border-2 border-black p-2 h-full"
          label={field.name}
          onSelectDate={(date) => handleDateChange(date)}
        />
      )}
    </div>
  );
};

export default function NewTaskForm2({ configuration, onSave }) {
  const [formData, setFormData] = useState([]);
  const [fieldList, setFieldList] = useState([]);

  const onChange = (data) => {
    setFormData({ ...formData, ...data });
  };

  useEffect(() => {

    // To set fieldList value from config as array of object

    const maxRow = Math.max(...newFieldData.map((item) => item.row));
    const maxCol = Math.max(...newFieldData.map((item) => item.col));

    // Create array with maxRow x maxCol
    let fieldData = Array.from({ length: maxRow + 1 }, () =>
      Array.from({ length: maxCol + 1 }, () => null)
    );

    // Assign the value from configuration to fieldData
    newFieldData.forEach((item) => {
      fieldData[item.row][item.col] = item;
    });

    // Remove null value from fieldData
    const fieldDataGrid = fieldData.map((col) =>
      col.filter((row) => row != null)
    );

    // Set fieldList state with filtered fieldData
    setFieldList(fieldDataGrid);

  }, []);

  return (
    <div className="border-2 border-black rounded-sm px-4 py-2 pb-4 min-w-[440px] h-[490px] overflow-y-auto no-scrollbar transition-all">
      {/* Field Container */}
      <div className="flex flex-col gap-2">
        {fieldList?.map((rows, idx) => (
          <div key={idx} className="flex gap-2">
            {rows?.map((field, index) => (
              <FormField field={field} onChange={onChange} key={index} />
            ))}
          </div>
        ))}
        <DefaultButton
          type="submit"
          text="SUBMIT"
          onClick={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
        />
      </div>
    </div>
  );
}

const newFieldData = [
  {
    id: "text-field-1",
    name: "Title",
    type: "TextField",
    row: 0,
    col: 0,
  },
  {
    id: "text-field-4",
    name: "Subtitle",
    type: "TextField",
    row: 0,
    col: 1,
  },
  {
    id: "text-field-2",
    name: "Summary",
    type: "DescField",
    row: 1,
    col: 1,
  },
  {
    id: "spin-id-1",
    name: "Spin Button",
    type: "SpinButton",
    row: 2,
    col: 1,
  },
  {
    id: "date-id-1",
    name: "Date Picker",
    type: "DatePicker",
    row: 3,
    col: 0,
  },
];
