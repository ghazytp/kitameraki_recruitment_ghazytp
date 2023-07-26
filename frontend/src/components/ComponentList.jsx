import TitleTextField from "./dragComponents/TitleTextField";
import CustomTextField from "./dragComponents/CustomTextField";
import CustomDatePicker from "./dragComponents/CustomDatePicker";
import CustomSpinButton from "./dragComponents/CustomSpinButton";
import DescriptionTextField from "./dragComponents/DescriptionTextField";


const menuComponent = [
  {
    componentId: "6eb3ea9a-2b2e-11ee-be56-0242ac120002",
    componentName: "CustomTextField",
    component: CustomTextField,
  },
  {
    componentId: "6eb3ebbc-2b2e-11ee-be56-0242ac120002",
    componentName: "CustomDatePicker",
    component: CustomDatePicker,
  },
  {
    componentId: "6eb3ece8-2b2e-11ee-be56-0242ac120002",
    componentName: "CustomSpinButton",
    component: CustomSpinButton,
  },
];

const formComponent = [
  {
    componentId: "6eb3e6bc-2b2e-11ee-be56-0242ac120002",
    componentName: "TitleTextField",
    component: TitleTextField,
  },
  {
    componentId: "6eb3e950-2b2e-11ee-be56-0242ac120002",
    componentName: "DescTextField",
    component: DescriptionTextField,
  },
];

export { menuComponent, formComponent }
