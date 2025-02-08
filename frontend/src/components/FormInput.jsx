'use client'
import React from 'react'
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input'


const FormInput = () => {

    const emailPlaceholders = [
        "Enter your email",
    ];

    const passwordPlaceholders = [
        "Enter your password",
    ]

    const linkPlaceholders = [
        "Enter the link",
    ]

    const handleChange = function (e) {
        console.log(e.target.value);
      };
    return (
        <div>
            <div className="flex flex-col justify-center items-center ">
                <PlaceholdersAndVanishInput
                    placeholders={emailPlaceholders}
                    onChange={handleChange}
                // onSubmit={onSubmit}
                />
            </div>

            <div className="flex flex-col justify-center items-center ">
                <PlaceholdersAndVanishInput
                    placeholders={passwordPlaceholders}
                // onChange={handleChange}
                // onSubmit={onSubmit}
                />
            </div>
            <div className="flex flex-col justify-center items-center ">
                <PlaceholdersAndVanishInput
                    placeholders={linkPlaceholders}
                    onChange={handleChange}
                // onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}

export default FormInput