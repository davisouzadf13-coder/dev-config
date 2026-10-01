import { useSettings } from "../hooks/useStore";

export default function DynamicTheme() {
  const [settings] = useSettings();
  const c = settings.colors;

  const css = `
    :root {
      --site-navy: ${c.navy};
      --site-navy-dark: ${c.navyDark};
      --site-gold: ${c.gold};
      --site-gold-light: ${c.goldLight};
      --site-gold-pale: ${c.gold}22;
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
