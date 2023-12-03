// export default function Header() {
//     return (
//         <div>
//       <nav className="flex justify-between items-center h-20 p-4 bg-white">
//         <div>
            
//         </div>
//       </nav>
//       </div>
//     );
//   }
"use client"

// import { useRouter, usePathname } from "next/navigation";

// const Header = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pathSegments = pathname.split("/")[1];

//   // Function to replace UUID with "edit" and capitalize the first letter
//   const formatSegment = (segment) => {
    
//       return segment.charAt(0).toUpperCase() + segment.slice(1);
    
//   };

//   return (
//     <div className="header">
//       <nav className="flex justify-between items-center h-20 p-4 bg-white">
//         <div>
//           {formatSegment(pathSegments)}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathSegments = router.pathname  ? router.asPath.split('/').filter((segment) => segment !== '') : [];

  return (
    <div className="header">
      <nav className="flex justify-between items-center h-20 p-4 bg-white">
        <div>
      {pathSegments.map((segment, index) => (
        <span key={segment}>
          {index > 0 && <span>&gt;</span>}
          <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
            <a>{segment}</a>
          </Link>
        </span>
      ))}
      </div>
      </nav>
    </div>
  );
};

// export default Breadcrumb;

export default Header;
