interface Props {
  label: string;
  className: string;
  onClick: () => string | undefined;
}

export default function Button({ className, label, onClick }: Props) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
