"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';
import Logout from './Logout';
import { useRouter } from 'next/navigation';

const ProfileMenu = ({ user }) => {
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false);

    const handleProfileClick = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#profile-menu") && !event.target.closest("#profile-avatar")) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-30" id="profile-menu">
            <div id="profile-avatar" className="cursor-pointer" onClick={handleProfileClick}>
                <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
            </div>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 right-0  shadow-lg p-4 rounded-md"
                    >
                        <Button className="w-24 mb-2 bg-myAccent text-white z-30" variant='ghost' onClick={()=>router.push('/profile')}>Profile</Button>
                        <Button className="w-24 bg-myAccent text-white z-30" onClick={()=> console.log("clicked")} variant='ghost'>
                            <Logout/>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileMenu;
