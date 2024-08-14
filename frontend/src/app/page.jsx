'use client';

import { React, useState, useEffect } from "react";
import StatsCard from "./_components/StatsCard";
import DefectDashChart from "./_components/DefectRateDashChart";
import TotalDoneDashChart from "./_components/TotalDoneDashChart";
import { Paper, Grid } from "@mui/material";
import axios from "axios";
import { CardClass } from "./_utils/cardClasses";

export default function Home() {
  const [cardData, setCardData] = useState([])
  const [chartData, setChartData] = useState([])
  const CARD_API_URL = '***'
  const CHART_API_URL = '***'

  useEffect(() => {
    fetchCardData();
    fetchChartData();
  }, [])

  const fetchCardData = async () => {
    try {
      const response = await axios.get(CARD_API_URL)
      setCardData(response.data)
    } catch (error) {'Ошибка при получении данных:', error}
  }

  const fetchChartData = async () => {
    try {
      const response = await axios.get(CHART_API_URL)
      setChartData(response.data)
    } catch (error) {'Ошибка при получении данных для графиков:', error}
  }

  // Наполнение карточек
  const totalDoneCard = new CardClass(cardData.total_done, cardData.diff_total_done, 'Всего произведено', 'ед')
  const totalDoneDailyCard = new CardClass(cardData.total_done_daily, cardData.diff_total_done_daily, 'В среднем за день', 'ед')
  const totalDoneDefectCard = new CardClass(cardData.total_done_defect, cardData.diff_total_done_defect, 'Забраковано', 'ед')
  const defectCard = new CardClass(cardData.avg_defect_rate, cardData.diff_avg_defect_rate, 'Процент брака', '%')
  const productivityCard = new CardClass(cardData.daily_productivity, cardData.diff_daily_productivity, 'Производительность', 'шт/ч')
  const capacityCard = new CardClass(cardData.daily_capacity, cardData.diff_daily_capacity, 'Трудозатраты', 'чел.ч')

  return (
    <Grid container>
      <Grid item xs={2}>
        <StatsCard data={totalDoneCard.data} data_diff={totalDoneCard.data_diff} name={totalDoneCard.name} measure={totalDoneCard.measure}/>
        <StatsCard data={totalDoneDailyCard.data} data_diff={totalDoneDailyCard.data_diff} name={totalDoneDailyCard.name} measure={totalDoneDailyCard.measure}/>
        <StatsCard data={totalDoneDefectCard.data} data_diff={totalDoneDefectCard.data_diff} name={totalDoneDefectCard.name} measure={totalDoneDefectCard.measure}/>
        <StatsCard data={defectCard.data} data_diff={defectCard.data_diff} name={defectCard.name} measure={defectCard.measure}/>
        <StatsCard data={productivityCard.data} data_diff={productivityCard.data_diff} name={productivityCard.name} measure={productivityCard.measure}/>
        <StatsCard data={capacityCard.data} data_diff={capacityCard.data_diff} name={capacityCard.name} measure={capacityCard.measure}/>
      </Grid>
      <Grid item xs={10}>
        <Paper sx={{p:2, my:0.5}} elevation={3}>
          <TotalDoneDashChart data={chartData} />
          <DefectDashChart data={chartData} />
        </Paper>
      </Grid>
    </Grid>

  );
}