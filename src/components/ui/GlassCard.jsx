import { cn } from "../../lib/utils";

/**
 * 라이트 클리니컬 카드 (구 GlassCard — 호환성을 위해 이름 유지)
 * 흰색 서피스 + 얇은 라인 + 부드러운 그림자
 */
export function GlassCard({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-line bg-surface p-4 card-shadow",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
