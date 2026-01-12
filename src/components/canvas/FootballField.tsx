import { Layer, Line, Circle, Rect, Text } from 'react-konva'

interface FootballFieldProps {
    width: number
    height: number
    fieldWidth: number
    fieldLength: number
    fieldType: 'full' | 'half' | '7v7'
}

export default function FootballField({
    width,
    height,
    fieldWidth,
    fieldLength,
    fieldType
}: FootballFieldProps) {
    const padding = 20
    const fieldColor = '#4ade80' // Green
    const lineColor = '#ffffff'
    const lineWidth = 2

    // Calculate scale to fit field in canvas
    const scaleX = (width - padding * 2) / fieldWidth
    const scaleY = (height - padding * 2) / fieldLength
    const scale = Math.min(scaleX, scaleY)

    const scaledWidth = fieldWidth * scale
    const scaledLength = fieldLength * scale
    const offsetX = (width - scaledWidth) / 2
    const offsetY = (height - scaledLength) / 2

    return (
        <Layer>
            {/* Field background */}
            <Rect
                x={offsetX}
                y={offsetY}
                width={scaledWidth}
                height={scaledLength}
                fill={fieldColor}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />

            {/* Center line */}
            <Line
                points={[
                    offsetX + scaledWidth / 2, offsetY,
                    offsetX + scaledWidth / 2, offsetY + scaledLength
                ]}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />

            {/* Center circle */}
            <Circle
                x={offsetX + scaledWidth / 2}
                y={offsetY + scaledLength / 2}
                radius={9.15 * scale}
                stroke={lineColor}
                strokeWidth={lineWidth}
            />

            {/* Center spot */}
            <Circle
                x={offsetX + scaledWidth / 2}
                y={offsetY + scaledLength / 2}
                radius={0.3 * scale}
                fill={lineColor}
            />

            {/* Penalty areas and goal areas */}
            {fieldType !== '7v7' && (
                <>
                    {/* Top penalty area */}
                    <Rect
                        x={offsetX + (scaledWidth - 40.3 * scale) / 2}
                        y={offsetY}
                        width={40.3 * scale}
                        height={16.5 * scale}
                        stroke={lineColor}
                        strokeWidth={lineWidth}
                    />

                    {/* Top goal area */}
                    <Rect
                        x={offsetX + (scaledWidth - 18.3 * scale) / 2}
                        y={offsetY}
                        width={18.3 * scale}
                        height={5.5 * scale}
                        stroke={lineColor}
                        strokeWidth={lineWidth}
                    />

                    {/* Bottom penalty area */}
                    <Rect
                        x={offsetX + (scaledWidth - 40.3 * scale) / 2}
                        y={offsetY + scaledLength - 16.5 * scale}
                        width={40.3 * scale}
                        height={16.5 * scale}
                        stroke={lineColor}
                        strokeWidth={lineWidth}
                    />

                    {/* Bottom goal area */}
                    <Rect
                        x={offsetX + (scaledWidth - 18.3 * scale) / 2}
                        y={offsetY + scaledLength - 5.5 * scale}
                        width={18.3 * scale}
                        height={5.5 * scale}
                        stroke={lineColor}
                        strokeWidth={lineWidth}
                    />

                    {/* Penalty spots */}
                    <Circle
                        x={offsetX + scaledWidth / 2}
                        y={offsetY + 11 * scale}
                        radius={0.3 * scale}
                        fill={lineColor}
                    />
                    <Circle
                        x={offsetX + scaledWidth / 2}
                        y={offsetY + scaledLength - 11 * scale}
                        radius={0.3 * scale}
                        fill={lineColor}
                    />
                </>
            )}

            {/* Field dimensions text */}
            <Text
                x={offsetX}
                y={offsetY - 18}
                text={`${fieldWidth}m × ${fieldLength}m`}
                fontSize={12}
                fill="#94a3b8"
                fontFamily="Inter, sans-serif"
            />
        </Layer>
    )
}
