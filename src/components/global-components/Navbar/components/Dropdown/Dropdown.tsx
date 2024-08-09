import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Dropdown = ({
  name,
  links,
}: {
  name: string;
  links: { name: string; link: string }[];
}) => {
  return (
    <div className="dropdown" id="dropdown">
      <button className="dropbtn">
        {name} <KeyboardArrowDownIcon />
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        {links.map((link) => (
          <Link key={`${link.name}${Math.random()}`} href={link.link}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
