import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "../../components/ui/Switch";
import { Button } from "../../components/ui/button";
import {
  Settings,
  Bell,
  Lock,
  Globe,
  FileText,
  User,
  LogOut,
} from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <motion.div
      className="flex justify-center h-screen px-6 py-8 overflow-y-auto bg-slate-50 dark:bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-3xl space-y-6">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="flex items-center gap-2 text-3xl font-bold text-[#0d141c] dark:text-white">
            <Settings className="w-6 h-6 text-cyan-600" />
            Settings
          </h2>
          <p className="text-sm text-[#49739c]">Manage your account and preferences</p>
        </motion.div>

        <SettingsSection title="Account" icon={<User className="text-cyan-600" />}>
          <SettingRow label="Email" value="sophia.miller@email.com" actionLabel="Update" />
          <SettingRow label="Password" value="********" actionLabel="Update" />
          <SettingRow label="Phone" value="+1 (555) 123-4567" actionLabel="Update" />
        </SettingsSection>

        <SettingsSection title="Preferences" icon={<Globe className="text-cyan-600" />}>
          <SettingRow label="Units" value="Metric" actionLabel="Update" />
          <SettingRow label="Language" value="English" actionLabel="Update" />
          <SettingRow label="Timezone" value="UTC" actionLabel="Update" />
        </SettingsSection>

        <SettingsSection title="Notifications" icon={<Bell className="text-cyan-600" />}>
          <SettingToggleRow
            label="Email Notifications"
            description="Receive email notifications about your account activity"
            checked={emailNotifications}
            onChange={setEmailNotifications}
          />
          <SettingToggleRow
            label="Push Notifications"
            description="Receive push notifications on your mobile device"
            checked={pushNotifications}
            onChange={setPushNotifications}
          />
        </SettingsSection>

        <SettingsSection title="Security" icon={<Lock className="text-cyan-600" />}>
          <SettingRow label="Connected Devices" value="Manage your connected devices" actionLabel="Manage" />
          <SettingRow label="Two-Factor Authentication" value="Enable two-factor authentication" actionLabel="Enable" />
        </SettingsSection>

        <SettingsSection title="Legal" icon={<FileText className="text-cyan-600" />}>
          <SettingLink label="Terms of Service" />
          <SettingLink label="Privacy Policy" />
        </SettingsSection>

        <motion.div
          className="flex justify-end mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="h-10 px-4 font-bold bg-[#e7edf4] text-[#0d141c] tracking-wide hover:bg-[#dbe7f4] transition">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SettingsSection({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <motion.section
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="flex items-center gap-2 text-lg font-bold text-[#0d141c] dark:text-white">
        {icon}
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </motion.section>
  );
}

function SettingRow({
  label,
  value,
  actionLabel,
}: {
  label: string;
  value: string;
  actionLabel: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 transition bg-white rounded-md shadow-sm dark:bg-slate-800 hover:shadow-md">
      <div>
        <p className="text-base font-medium text-[#0d141c] dark:text-white">{label}</p>
        <p className="text-sm text-[#49739c]">{value}</p>
      </div>
      <Button className="h-8 px-4 text-sm font-medium bg-[#e7edf4] text-[#0d141c] hover:bg-[#dbe7f4] transition">
        {actionLabel}
      </Button>
    </div>
  );
}

function SettingToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2 transition bg-white rounded-md shadow-sm dark:bg-slate-800 hover:shadow-md">
      <div>
        <p className="text-base font-medium text-[#0d141c] dark:text-white">{label}</p>
        <p className="text-sm text-[#49739c]">{description}</p>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

function SettingLink({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 transition bg-white rounded-md shadow-sm dark:bg-slate-800 hover:shadow-md">
      <p className="text-base text-[#0d141c] dark:text-white truncate">{label}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-[#0d141c] dark:text-white"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
      </svg>
    </div>
  );
}
