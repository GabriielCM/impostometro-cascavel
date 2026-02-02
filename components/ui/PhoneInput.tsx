'use client'

import PhoneInputWithCountry from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
}

export function PhoneInput({ value, onChange, error, placeholder = '(99) 99999-9999' }: PhoneInputProps) {
  return (
    <div className="phone-input-wrapper">
      <PhoneInputWithCountry
        international
        defaultCountry="BR"
        value={value}
        onChange={(val) => onChange(val || '')}
        placeholder={placeholder}
        className={`phone-input-custom ${error ? 'has-error' : ''}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

      <style jsx global>{`
        .phone-input-wrapper .PhoneInput {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: border-color 0.2s;
        }

        .phone-input-wrapper .PhoneInput:focus-within {
          border-color: #FFD700;
        }

        .phone-input-wrapper .PhoneInput.has-error {
          border-color: #ef4444;
        }

        .phone-input-wrapper .PhoneInputCountry {
          margin-right: 0.75rem;
        }

        .phone-input-wrapper .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1rem;
          border-radius: 2px;
          overflow: hidden;
        }

        .phone-input-wrapper .PhoneInputCountrySelectArrow {
          color: white;
          opacity: 0.6;
          margin-left: 0.25rem;
        }

        .phone-input-wrapper .PhoneInputCountrySelect {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
        }

        .phone-input-wrapper .PhoneInputCountrySelect option {
          background: #1a1a1a;
          color: white;
        }

        .phone-input-wrapper .PhoneInputInput {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 1rem;
        }

        .phone-input-wrapper .PhoneInputInput::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  )
}
