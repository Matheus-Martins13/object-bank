import './style.css';

export const Sidebar = () => {
  return(
    <nav id="sidebar" className="w-64 mt-12">
      <div id="title" className="p-2 bg-secondary">
        <p className='text-center font-bold'>Sidebar</p>
      </div>
      <div id="body" className='bg-gray-300'>
        <p>teste</p>
        <p>teste</p>
      </div>
    </nav>
  );
};
