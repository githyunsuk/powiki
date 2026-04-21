import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import TypeBadge from "../components/TypeBadge";

/**
 * 2. 정보 컬럼 컴포넌트 (하드코딩을 편하게 해주는 템플릿)
 */
function InfoColumn({ label, value, children, isLast, accentColor }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0, // 자식 콘텐츠가 부모를 뚫고 나가지 못하게 방지
        borderRight: isLast ? "none" : "1px solid #edf2f7",
      }}
    >
      {/* 헤더 부분 */}
      <Box
        sx={{
          bgcolor: accentColor,
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 0.5,
          flexShrink: 0, // 헤더 높이 유지
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "800",
            fontSize: "0.75rem",
            textAlign: "center",
            // 만약 헤더 글자도 길어서 짤린다면 아래 주석 해제
            // whiteSpace: "normal",
            // lineHeight: 1.1,
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* 값 부분 */}
      <Box
        sx={{
          py: 2,
          px: 1, // 좌우 여유를 조금 더 줌
          bgcolor: "#fff",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "65px",
        }}
      >
        {children ? (
          children
        ) : (
          <Typography
            variant="body2"
            fontWeight="700"
            sx={{
              color: "#334155",
              fontSize: "0.8rem",
              textAlign: "center",
              lineHeight: 1.3,
              wordBreak: "break-all",
              whiteSpace: "normal",
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

/**
 * 3. 메인 상세 페이지 컴포넌트
 */
function PokemonDetail() {
  const ACCENT_COLOR = "#66A945";

  // 실제 DB에서 넘어오는 형태를 가정한 데이터 객체
  const pokemon = {
    pokedex_id: "0906",
    ko_name: "나오하",
    image_url:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.pnㄴg",
    // 타입 데이터
    types: [
      { typeName: "풀", typeColor: "#74CB48" },
      { typeName: "악", typeColor: "#74CB48" },
    ],
    // 종족값 데이터
    stats: [
      { subject: "HP", A: 40 },
      { subject: "공격", A: 61 },
      { subject: "방어", A: 54 },
      { subject: "특공", A: 45 },
      { subject: "특방", A: 45 },
      { subject: "스피드", A: 65 },
    ],
    // 특성 데이터
    abilities: [
      {
        name: "심록",
        desc: "자신의 현재 HP가 1/3 이하일 때 풀타입 기술의 위력이 1.5배 증가한다.",
      },
      {
        name: "변환자재",
        desc: "배틀에 나올 때마다 단 한 번 자신이 사용한 기술과 같은 타입으로 변화한다.",
      },
    ],
    // 기본 정보 데이터 (DB 필드명 그대로 사용)
    classification: "풀고양이포켓몬몬몬몬ㄴ",
    height: 0.4,
    weight: 4.1,
    capture_rate: 45,
    gender_ratio: "수컷 85% / 암컷 15%",
    egg_groups: "식물 / 육상",
    type_efficacy: {
      0: [{ id: 14, name: "에스퍼", color: "#DD6B7B" }],
      0.25: [], // 해당 사항 없음
      0.5: [
        { id: 5, name: "땅", color: "#9C7743" },
        { id: 8, name: "고스트", color: "#684870" },
        { id: 11, name: "물", color: "#5185C5" },
        { id: 12, name: "풀", color: "#66A945" },
        { id: 13, name: "전기", color: "#FBB917" },
        { id: 17, name: "악", color: "#4C4948" },
      ],
      1: [
        { id: 1, name: "노말", color: "#949495" },
        { id: 6, name: "바위", color: "#BFB889" },
        { id: 9, name: "강철", color: "#69A9C7" },
        { id: 16, name: "드래곤", color: "#535CA8" },
      ],
      2: [
        { id: 2, name: "격투", color: "#E09C40" },
        { id: 3, name: "비행", color: "#A2C3E7" },
        { id: 4, name: "독", color: "#735198" },
        { id: 10, name: "불꽃", color: "#F08030" },
        { id: 15, name: "얼음", color: "#6DC8EB" },
        { id: 18, name: "페어리", color: "#DAB4D4" },
      ],
      4: [{ id: 7, name: "벌레", color: "#9FA244" }],
    },
  };

  const CHART_MAX = 150;
  const chartData = pokemon.stats.map((stat) => ({
    ...stat,
    A_fixed: stat.A > CHART_MAX ? CHART_MAX : stat.A,
  }));

  return (
    <Container maxWidth="md" sx={{ py: 5, bgcolor: "#fcfcfc" }}>
      {/* 상단 타이틀 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: ACCENT_COLOR, fontWeight: "800", fontSize: "1.1rem" }}
        >
          NO.{pokemon.pokedex_id}
        </Typography>
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{ color: "#1a2a3a", mt: -1 }}
        >
          {pokemon.ko_name}
        </Typography>
      </Box>

      {/* 이미지 및 차트 영역 */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 6 }}>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#fff",
            borderRadius: 5,
            border: "1px solid #edf2f7",
            p: 4,
          }}
        >
          <img
            src={pokemon.image_url}
            alt={pokemon.ko_name}
            style={{
              width: "100%",
              maxWidth: "250px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1.2,
            p: 3,
            borderRadius: 5,
            bgcolor: "#fff",
            border: "1px solid #edf2f7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="800"
            sx={{ color: "#4a5568", mb: 2 }}
          >
            종족값
          </Typography>
          <Box sx={{ flexGrow: 1, minHeight: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 13, fill: "#718096", fontWeight: 700 }}
                />
                <PolarRadiusAxis
                  domain={[0, CHART_MAX]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  dataKey="A_fixed"
                  stroke={ACCENT_COLOR}
                  fill={ACCENT_COLOR}
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Stack>

      {/* 기본 정보 영역 (하드코딩 - 8개 컬럼 무조건 한 줄) */}
      <Box>
        <Typography
          variant="h6"
          fontWeight="800"
          sx={{
            mb: 2,
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 18,
              bgcolor: ACCENT_COLOR,
              borderRadius: 1,
            }}
          />
          기본 정보
        </Typography>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
            border: `1px solid ${ACCENT_COLOR}`,
            display: "flex",
            width: "100%",
          }}
        >
          {/* 1. 포켓몬 명칭 */}
          <InfoColumn
            label="포켓몬"
            value={`${pokemon.pokedex_id} ${pokemon.ko_name}`}
            accentColor={ACCENT_COLOR}
          />

          {/* 2. 분류 */}
          <InfoColumn
            label="분류"
            value={pokemon.classification}
            accentColor={ACCENT_COLOR}
          />

          {/* 3. 타입 (TypeBadge 사용) */}
          <InfoColumn label="타입" accentColor={ACCENT_COLOR}>
            <Stack spacing={0.5} alignItems="center">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.typeName} type={t} />
              ))}
            </Stack>
          </InfoColumn>

          {/* 4. 신장 */}
          <InfoColumn
            label="신장"
            value={`${pokemon.height}m`}
            accentColor={ACCENT_COLOR}
          />

          {/* 5. 체중 */}
          <InfoColumn
            label="체중"
            value={`${pokemon.weight}kg`}
            accentColor={ACCENT_COLOR}
          />

          {/* 7. 성비 */}
          <InfoColumn
            label="성비"
            value={pokemon.gender_ratio}
            accentColor={ACCENT_COLOR}
          />

          {/* 8. 알그룹 (마지막 컬럼) */}
          <InfoColumn
            label="알그룹"
            value={pokemon.egg_groups}
            accentColor={ACCENT_COLOR}
            isLast
          />
        </Paper>
      </Box>

      {/* 특성 정보 영역 */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          fontWeight="800"
          sx={{
            mb: 2,
            color: "#2d3748",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 18,
              bgcolor: ACCENT_COLOR,
              borderRadius: 1,
            }}
          />
          특성 정보
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: `1px solid ${ACCENT_COLOR}`,
          }}
        >
          {pokemon.abilities.map((ability, idx) => (
            <Box key={ability.name}>
              <Stack direction={{ xs: "column", sm: "row" }}>
                <Box
                  sx={{
                    width: { xs: "100%", sm: "160px" },
                    bgcolor: ACCENT_COLOR,
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="800"
                    sx={{ color: "#fff" }}
                  >
                    {ability.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: "#fff",
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#4a5568", lineHeight: 1.6 }}
                  >
                    {ability.desc}
                  </Typography>
                </Box>
              </Stack>
              {idx !== pokemon.abilities.length - 1 && (
                <Divider sx={{ borderColor: "#e0e0e0" }} />
              )}
            </Box>
          ))}
        </Paper>
      </Box>

      {/* 방어 상성 영역 */}
      <Box sx={{ mt: 4 }}>

        <Typography variant="h6" fontWeight="800" sx={{mb: 2, color: "#2d3748", display: "flex", alignItems: "center", gap: 1}}>
          <Box sx={{width: 4, height: 18, bgcolor: ACCENT_COLOR, borderRadius: 1}}/>
          방어 상성
        </Typography>

        <Paper elevation={0} sx={{borderRadius: 4, overflow: "hidden", border: `1px solid ${ACCENT_COLOR}`}}>
          {Object.entries(pokemon.type_efficacy).sort(([a], [b]) => parseFloat(b) - parseFloat(a)).map(([multiplier, types], idx, array) => {
              if (types.length === 0) return null;

              return (
                <Box key={multiplier}>
                  <Stack direction="row">

                    <Box sx={{width: "100px", bgcolor: ACCENT_COLOR, p: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0}}>
                      <Typography variant="body1" fontWeight="900" sx={{ color: "#fff" }}>
                        {multiplier}배
                      </Typography>
                    </Box>

                    <Box sx={{p: 2, bgcolor: "#fff", flexGrow: 1, display: "flex", alignItems: "center"}}>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {types.map((type) => (
                          <TypeBadge key={type.id} type={{typeName: type.name, typeColor: type.color}}/>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>

                  {idx !== array.length - 1 && (
                    <Divider sx={{ borderColor: "#e0e0e0" }} />
                  )}
                </Box>
              );
            })}
        </Paper>
      </Box>
      
    </Container>
  );
}

export default PokemonDetail;
