import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";

const STORAGE_KEY = "ouichat-realtime-test-notice-dismissed";

const RealtimeTestNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(localStorage.getItem(STORAGE_KEY) !== "true");
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-6 sm:max-w-sm">
      <div className="rounded-lg border border-primary/20 bg-base-100 p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Info className="size-5 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold">Test real-time chat</h2>
            <p className="mt-1 text-sm leading-5 text-base-content/70">
              For the live chat demo, sign in with two different accounts from two browsers,
              private windows, or separate computers.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-xs btn-square"
            onClick={handleDismiss}
            aria-label="Dismiss real-time chat testing note"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RealtimeTestNotice;
