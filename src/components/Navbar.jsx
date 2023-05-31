import React from 'react'
import logo from '../assets/logo.png'
import {DownOutlined} from '@ant-design/icons'
import { Dropdown,Space } from 'antd'
import { Link } from 'react-router-dom';
import {AiOutlineUserAdd} from 'react-icons/ai'
import {FaSignInAlt} from 'react-icons/fa'
export default function Navbar() {
    const items = [
      {
        label: (
          <div>
            <Link className="text-[rgba(0,195,154,1)]" to="/login">
                <FaSignInAlt className='inline-block mr-1'/>
              Sign in
            </Link>
          </div>
        ),
        key: "0",
      },
      {
        type: "divider",
      },
      {
        label: (
          <div>
            <Link className="text-[rgba(0,195,154,1)] " to="/register">
             <AiOutlineUserAdd className='inline-block mr-1'/>
              Sign up
            </Link>
          </div>
        ),
        key: "1",
      },
    ];
  return (
    <div className="bg-black text-white py-4 px-8 w-full fixed flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="" className="w-6 h-6" />
        <h1 className="text-2xl font-bold ml-2">ChatNet</h1>
      </div>
      <Dropdown menu={{ items }} trigger={["hover"]}>
        <a onClick={(e) => e.preventDefault()} href=''>
          <Space className='text-lg font-semibold'>
            Menu
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
