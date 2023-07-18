import styles from './toggle.module.scss';

export type ToggleProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
};

function Toggle(props: ToggleProps) {
  return (
    <div
      className={props.enabled ? styles.toggleEnabled : styles.toggle}
      onClick={() => props.onChange(!props.enabled)}>
      <div/>
    </div>
  );
}

export default Toggle;
