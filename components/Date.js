import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <span dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</span>;
}
