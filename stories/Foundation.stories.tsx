import type { Meta, StoryObj } from '@storybook/react-vite';

const fontSizes = [
  ['text-3xl', '2.5rem', '140%'],
  ['text-2xl', '1.5rem', '140%'],
  ['text-xl', '1.25rem', '140%'],
  ['text-lg', '1.125rem', '160%'],
  ['text-md', '1rem', '160%'],
  ['text-sm', '0.875rem', '160%'],
  ['text-base', '0.875rem', '160%'],
] as const;

const colors = [
  ['bg-blue', '#143379'],
  ['bg-blue-select', '#3D74EE'],
  ['bg-blue-hover', '#3565CE'],
  ['bg-blue-mixed', '#7FA3F4'],
  ['bg-blue-clicked', '#CEDDFF'],
  ['bg-blue-extralight', '#ECF1FD'],
  ['bg-blue-light', '#F7F9FF'],
  ['bg-gray', '#64748B'],
  ['bg-gray-light', '#B5BFCD'],
  ['bg-gray-icon', '#9CA7BC'],
  ['bg-gray-outline', '#E2E8F0'],
  ['bg-gray-bg', '#F1F5F9'],
  ['bg-gray-bglight', '#F9FAFC'],
  ['bg-purple', '#6B25D9'],
  ['bg-purple-bg', '#F0E7FE'],
  ['bg-purple-hover', '#E0D0FC'],
  ['bg-destructive', '#ED4D4D'],
  ['bg-destructive-hover', '#D74545'],
  ['bg-green', '#4DC776'],
  ['bg-skyblue', '#5FBDFF'],
  ['bg-skyblue-select', '#C4E1F8'],
  ['bg-navy', '#1B2D53'],
  ['bg-navy-dark', '#111C33'],
  ['bg-dark', '#020817'],
  ['bg-yellow', '#FBCD3B'],
  ['bg-yellow-light', '#FFF3C8'],
  ['bg-naver', '#03C75A'],
  ['bg-kakao', '#FEE500'],
] as const;

const screens = [
  ['underDesktop', '1279px 이하'],
  ['underLaptop', '1023px 이하'],
  ['underTablet', '767px 이하'],
  ['underMobile', '479px 이하'],
] as const;

function FoundationPage() {
  return (
    <div className="font-pretendard flex w-[720px] max-w-full flex-col gap-10 text-dark">
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">폰트</h2>
        <p className="text-sm text-gray">Pretendard · font-pretendard</p>
        <div className="flex flex-col gap-5">
          {fontSizes.map(([className, size, lineHeight]) => (
            <div key={className} className="flex flex-col gap-1">
              <div className="flex gap-3 text-sm text-gray">
                <span>{className}</span>
                <span>
                  {size} / {lineHeight}
                </span>
              </div>
              <p className={className}>도면을 저장합니다</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">색</h2>
        <div className="grid grid-cols-2 gap-3">
          {colors.map(([className, hex]) => (
            <div key={className} className="flex items-center gap-3">
              <div className={`h-10 w-10 shrink-0 rounded border ${className}`} />
              <div className="min-w-0">
                <div className="text-sm">{className}</div>
                <div className="text-sm text-gray">{hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">화면 너비</h2>
        <div className="flex flex-col gap-2">
          {screens.map(([name, width]) => (
            <div key={name} className="flex gap-4 text-sm">
              <span className="w-32">{name}</span>
              <span className="text-gray">{width}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Foundation',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <FoundationPage />,
};
