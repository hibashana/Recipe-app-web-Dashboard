'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // Function to filter out UUID-like segments
  const filterUUID = (segment) => !segment.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);

  return (
    <div className="header">
      <nav className="flex justify-between items-center h-20 p-4 bg-white">
        <div>
          {/* {pathSegments
            .filter(filterUUID)
            .map((segment, index) => (
              <span key={segment}>
                {index > 0 && <span>&nbsp;&gt;&nbsp;</span>}
                {index < pathSegments.length - 1 ? (
                  <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`} passHref>
                    <span>{segment}</span>
                  </Link>
                ) : (
                  <span>{segment}</span>
                )}
              </span>
            ))} */}
            {pathSegments
            .filter(filterUUID)
            .map((segment, index) => (
              <span key={segment}>
                {index > 0 && <span>&nbsp;&gt;&nbsp;</span>}
                {index < pathSegments.filter(filterUUID).length - 1 ? (
                  <Link href={`/${pathSegments.slice(0, index + 1).filter(filterUUID).join("/")}`} passHref>
                    <span>{segment.charAt(0).toUpperCase()+ segment.slice(1)}</span>
                  </Link>
                ) : (
                  <span>{segment.charAt(0).toUpperCase()+ segment.slice(1)}</span>
                )}
              </span>
            ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;



// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";

// const Header = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pathSegments = pathname.split("/").filter((segment) => segment !== "");

//   // Function to replace UUID with "edit" and capitalize the first letter
//   const formatSegment = (segment) => {
//     if (segment.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)) {
//       return null;
//     } else {
//       return segment.charAt(0).toUpperCase() + segment.slice(1);
//     }
//   };

//   return (
//     <div className="header">
//       <nav className="flex justify-between items-center h-20 p-4 bg-white">
//         <div>
//           {pathSegments.map((segment, index) => (
//             <span key={segment}>
//               {index > 0 && <span>&nbsp;&gt;&nbsp;</span>}
//               {index < pathSegments.length - 1 ? (
//                 <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`} passHref>
//                   <span>{formatSegment(segment)}</span>
//                 </Link>
//               ) : (
//                 <span>{formatSegment(segment)}</span>
//               )}
//             </span>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;


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

// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";

// const Header = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const pathSegments = pathname.split("/").filter((segment) => segment !== "");

//   // Function to filter out UUID-like segments
//   const filterUUID = (segment) => !segment.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);

//   return (
//     <div className="header">
//       <nav className="flex justify-between items-center h-20 p-4 bg-white">
//         <div>
//           {pathSegments
//             .filter(filterUUID)
//             .map((segment, index) => (
//               <span key={segment}>
//                 {index > 0 && <span>&nbsp;&gt;&nbsp;</span>}
//                 {index < pathSegments.length - 1 ? (
//                   <Link href={`/${pathSegments.slice(0, index + 1).filter(filterUUID).join("/")}`} passHref>
//                     <a>{segment}</a>
//                   </Link>
//                 ) : (
//                   <span>{segment}</span>
//                 )}
//               </span>
//             ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;
