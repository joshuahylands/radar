import Tooltip from '@components/Tooltip';

type SidebarDataProps = {
  label: string;
  data?: string | number;
  units?: string;
  tooltip?: string;
};

function SidebarData(props: SidebarDataProps) {
  return (
    <div>
      <label>
        <span>{ props.label }</span>
        {
          props.tooltip ? (
            <Tooltip text={props.tooltip} position="top">
              <span className="material-symbols-outlined">info</span>
            </Tooltip>
          ) : null
        }
      </label>
      <span>{ props.data || 'N/A' }{ props.data ? props.units : '' }</span>
    </div>
  );
}

export default SidebarData;
