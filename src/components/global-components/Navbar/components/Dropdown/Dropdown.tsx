import Link from 'next/link';

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
        {name}
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        {links.map((link) => (
          <Link href={link.link}>{link.name}</Link>
        ))}
      </div>
    </div>
  );
};
