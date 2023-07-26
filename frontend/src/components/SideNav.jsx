import { Icon } from "@fluentui/react/lib/Icon";

export default function SideNav({
  isAddForm,
  handleAddForm,
  isFormSettings,
  handleSettings,
}) {
  const closeFormClass =
    "border-2 border-black text-xl px-3 py-2 rounded-sm shadow-sm bg-red-500 open [&.open>*]:rotate-45";

  const defaultNavClass =
    "border-2 border-black text-xl px-3 py-2 rounded-sm shadow-sm hover:bg-yellow-200";

  const settingsNavClass =
    "border-2 border-black text-xl px-3 py-2 rounded-sm shadow-sm bg-yellow-200";

  return (
    <div>
      <ul className="flex flex-col gap-2">
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddForm();
            }}
            className={isAddForm ? closeFormClass : defaultNavClass}
          >
            <Icon iconName="Add" className="transition-all duration-150" />
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSettings();
            }}
            className={isFormSettings ? settingsNavClass : defaultNavClass}
          >
            <Icon iconName="Settings" />
          </button>
        </li>
      </ul>
    </div>
  );
}
