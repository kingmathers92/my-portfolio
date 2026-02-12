import { T } from '../shared/theme'

export function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '22px 48px',
    }}>

      <a href="#hero" style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: -0.5,
        color: T.text,
      }}>
        K<span style={{ color: T.accent }}>.</span>BY
      </a>

      <ul style={{ display: 'flex', gap: 28, listStyle: 'none' }}>
        {['About','Skills','Projects','Writing','AI','Contact'].map(link => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="nav-link"
              style={{
                color: T.muted,
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

    </nav>
  )
}