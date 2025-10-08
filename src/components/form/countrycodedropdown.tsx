import React, { useState, useEffect, useRef } from 'react';
import countries from '../../../countryCodes.json';

interface Country {
    name: string;
    code: string;
    flag: string;
}

interface Props {
    selectedCode: string;
    setSelectedCode: (code: string) => void;
    disabled: boolean;
}

const CountryCodeDropdown: React.FC<Props> = ({ selectedCode, setSelectedCode, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedCountry = countries.find(c => c.code === selectedCode);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (country: Country) => {
        setSelectedCode(country.code);
        setIsOpen(false);
    };

    return (
        <div className="custom-select-wrapper" ref={dropdownRef}>
            <div 
                className={`select-selected ${disabled ? 'disabled' : ''}`} 
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                {selectedCountry?.flag} ({selectedCountry?.code})
            </div>
            {isOpen && (
                <div className="select-items">
                    {countries.map(country => (
                        <div 
                            key={country.code} 
                            onClick={() => handleSelect(country)}
                        >
                            {country.flag} ({country.code}) {country.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountryCodeDropdown;
