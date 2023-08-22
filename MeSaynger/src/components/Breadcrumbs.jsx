import { useLocation, Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function Breadcrumbs() {
  const location = useLocation()

  const crumbs = location.pathname.split('/').filter(crumb => crumb !== '')
  console.log(crumbs)
  //   .map(crumb => {
  //     currentLink += `/${crumb}`
  return (
   
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} fontSize="sm" mb={4}>
          {
            crumbs.map((crumb,index)=>{
              const currentLink="/"+crumbs.slice(0,index+1).join('/')

console.log(currentLink)
         return(     <BreadcrumbItem key={index}> 
              <Link to={currentLink} >{crumb}</Link>
            </BreadcrumbItem>
         )
            })
          }
      </Breadcrumb>

  )
}
