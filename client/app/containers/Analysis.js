import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestAnalysis} from '../actions/analysis';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.increaseChart = null;
    this.totalChart = null;
    this.compressChart = null;
    this.totalCompressChart = null;
  }

  componentDidMount() {
    this.totalChart = echarts.init(document.getElementById('total'));
    // 指定图表的配置项和数据
    let option = {
      title: {
        text: 'Athena 所有数据总览',
        x:'center'
      },
      tooltip: {},
      xAxis: {
        data: ['app', 'mod', 'page', 'widget']
      },
      yAxis: {},
      series: [{
        name: '记录数',
        type: 'bar',
        data: [0, 0, 0, 0]
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    this.totalChart.setOption(option);

    this.increaseChart = echarts.init(document.getElementById('increase'));
    this.increaseChart.setOption({
      title: {
        text: 'Athena 今日新增',
        x:'center'
      },
      tooltip: {},
      xAxis: {
        data: ['app', 'mod', 'page', 'widget']
      },
      yAxis: {},
      series: [{
        name: '记录数',
        type: 'bar',
        data: [0, 0, 0, 0]
      }]
    });

    this.compressChart = echarts.init(document.getElementById('compress'));
    this.compressChart.setOption({
      title: {
        text: 'Athena 今日压缩统计',
        subtext: '单位（bytes）',
        x:'center'
      },
      tooltip: {},
      series: [{
        name: '压缩字节',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        data:[
          {value:0, name:'js'},
          {value:0, name:'css'},
          {value:0, name:'image'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    });

    this.totalCompressChart = echarts.init(document.getElementById('totalCompress'));
    this.totalCompressChart.setOption({
      title: {
        text: 'Athena 历史压缩统计',
        subtext: '单位（bytes）',
        x:'center'
      },
      tooltip: {},
      series: [{
        name: '压缩字节',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        data:[
          {value:335, name:'js'},
          {value:10, name:'css'},
          {value:234, name:'image'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    });

    const {dispatch} = this.props;
    dispatch(requestAnalysis());
  }

  componentWillReceiveProps(nextProps) {
    const {analysis} = nextProps;

    console.log(analysis);
    this.increaseChart.setOption({
      series: [{
        name: '记录数',
        type: 'bar',
        data: analysis.analysis.todayIncrease
      }]
    });

    this.totalChart.setOption({
      series: [{
        name: '记录数',
        type: 'bar',
        data: analysis.analysis.total
      }]
    });


    this.compressChart.setOption({
      series: [{
        name: '压缩字节',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        data: analysis.analysis.todayCompress,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    });

    this.totalCompressChart.setOption({
      series: [{
        name: '压缩字节',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        data: analysis.analysis.totalCompress,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    });

  }

  render() {
    return (
      <div className="charts">
        <div className="today">
          <h4>今天数据概览</h4>
          <div id="increase" className="chart"></div>
          <div id="compress" className="chart"></div>
        </div>
        <div className="history">
          <h4>历史数据概览</h4>
          <div id="total" className="chart"></div>
          <div id="totalCompress" className="chart"></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    analysis: state.analysis
  };
}

export default connect(mapStateToProps)(Analysis);
