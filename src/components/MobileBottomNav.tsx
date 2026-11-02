import React from 'react';
import { Home, Layers, Terminal, Send } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: string;
  onContactClick?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onContactClick,
}) => {
  const navItems = [
    {
      id: 'hero',
      label: 'Home',
      href: '#',
      icon: Home,
    },
    {
      id: 'work',
      label: 'Work',
      href: '#work',
      icon: Layers,
    },
    {
      id: 'about',
      label: 'About',
      href: '#about',
      icon: Terminal,
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#contact',
      icon: Send,
      onClick: onContactClick,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#101112]/94 backdrop-blur-lg border-t border-[#292C2D] pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 px-3 shadow-[0_-8px_32px_rgba(0,0,0,0.85)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            activeSection === item.id || (!activeSection && item.id === 'hero');
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`flex-1 relative flex flex-col items-center justify-center py-1 transition-colors group ${
                isActive ? 'text-[#B8F36B]' : 'text-[#929795] hover:text-[#E8E9E5]'
              }`}
            >
              {/* Active Acid Lime Indicator Pip */}
              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#B8F36B] shadow-[0_0_8px_#B8F36B]" />
              )}

              <Icon
                className={`w-4 h-4 mb-1 transition-transform duration-200 group-active:scale-90 ${
                  isActive ? 'text-[#B8F36B]' : 'text-[#929795]'
                }`}
              />

              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${
                  isActive ? 'text-[#B8F36B] font-semibold' : 'text-[#929795]'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
