import React from 'react';
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineCloudUpload, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

const SideBar = () => {
  return (
    <div className="text-white bg-gray-700 min-h-screen">
      <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Logo href="#" img="/favicon.svg"  className="text-gray-800 ">
      Menu
      </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/upload" icon={HiOutlineCloudUpload}>
              Upload Books
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/manage" icon={HiInbox}>
              Manage Books
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/requests" icon={HiViewBoards}>
           Requests
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/user" icon={HiUser}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="/admin/dashboard/yourorders" icon={HiUser}>
           Your Orders
            </Sidebar.Item>
            <Sidebar.Item href="/shop" icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
            <Sidebar.Item href="/login" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="/logout" icon={HiTable}>
              Logout 
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default SideBar;
