interface FormatDateProps {
  date: string;
}

export const FormatDate = ({ date }: FormatDateProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));

  return <span>{formattedDate}</span>;
};
